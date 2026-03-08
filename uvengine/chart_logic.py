import os
import json
import subprocess
import sys
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "tfg_test")
os.makedirs(MODEL_DIR, exist_ok=True)

UVL_FILE = os.path.join(MODEL_DIR, "visualization.uvl")
TEMPLATE_FILE = os.path.join(MODEL_DIR, "chart.json.jinja")
MAPPING_FILE = os.path.join(MODEL_DIR, "mapping.csv")
TEMP_REQUEST_FILE = os.path.join(MODEL_DIR, "temp_request.json")
OUTPUT_FILE = os.path.join(MODEL_DIR, "chart_resolved.json")
UPLOADED_CSV_PATH = os.path.join(MODEL_DIR, "data_current.csv")

FEW_PALETTE = [
    (140, 140, 140), # Gris
    (93, 165, 218),  # Azul
    (250, 164, 58),  # Naranja
    (96, 189, 104),  # Verde
    (241, 124, 176), # Rosa
    (178, 145, 47),  # Marrón
    (178, 118, 178), # Morado
    (222, 207, 63),  # Amarillo
    (241, 88, 84)    # Rojo
]

def get_colors(labels_len, is_time_series):
    """Genera los arrays de colores según la paleta de Few"""
    if not is_time_series:
        bg_colors = [f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 0.6)' for i in range(labels_len)]
        border_colors = [f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 1)' for i in range(labels_len)]
    else:
        bg_colors = f"rgba({FEW_PALETTE[1][0]}, {FEW_PALETTE[1][1]}, {FEW_PALETTE[1][2]}, 0.2)"
        border_colors = f"rgba({FEW_PALETTE[1][0]}, {FEW_PALETTE[1][1]}, {FEW_PALETTE[1][2]}, 1)"
    return bg_colors, border_colors

def analyze_csv_file(filepath):
    """Lee el CSV y extrae columnas, tipos y previsualización"""
    try:
        df = pd.read_csv(filepath, sep=';', decimal=',')
        if len(df.columns) < 2:
            raise ValueError()
    except:
        df = pd.read_csv(filepath, sep=',', decimal='.')

    column_types = {}
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            column_types[col] = 'Numérico'
        else:
            try:
                pd.to_datetime(df[col], dayfirst=True, errors='raise')
                column_types[col] = 'Fecha'
            except:
                column_types[col] = 'Texto/Categoría'

    return list(df.columns), df.head(5).to_dict(orient='records'), column_types, len(df)

def process_and_run_engine(user_input):
    """Procesa los datos, auto-completa el JSON y ejecuta UVEngine"""
    config = user_input.get('config', {})
    mapping = config.get('mapping', {})
    
    x_col = mapping.get('x')
    y_col = mapping.get('y')
    granularity = mapping.get('granularity')
    agg_func = mapping.get('aggregate', 'sum')

    if not os.path.exists(UPLOADED_CSV_PATH):
        raise FileNotFoundError("CSV no encontrado en el servidor")
        
    try:
        df = pd.read_csv(UPLOADED_CSV_PATH, sep=';', decimal=',')
        if len(df.columns) < 2: raise ValueError()
    except:
        df = pd.read_csv(UPLOADED_CSV_PATH, sep=',', decimal='.')
    
    if x_col not in df.columns or y_col not in df.columns:
         raise ValueError(f"Las columnas {x_col} o {y_col} no existen en el CSV cargado.")

    df_clean = df[[x_col, y_col]].dropna().copy()

    # Agrupación y Fechas
    if granularity:
        df_clean[x_col] = pd.to_datetime(df_clean[x_col], dayfirst=True, errors='coerce')
        df_clean = df_clean.dropna(subset=[x_col])
        if granularity == 'year':
            df_clean[x_col] = df_clean[x_col].dt.to_period('Y')
        elif granularity == 'month_year':
            df_clean[x_col] = df_clean[x_col].dt.to_period('M')
    
    df_grouped = df_clean.groupby(x_col)[y_col].agg(agg_func).reset_index()
    
    # Ordenación
    if config.get('EmphasizeLarger'):
        df_grouped = df_grouped.sort_values(by=y_col, ascending=False)
        user_input['config']['SortedDesc'] = True
    elif config.get('EmphasizeSmaller'):
        df_grouped = df_grouped.sort_values(by=y_col, ascending=True)
        user_input['config']['SortedAsc'] = True
    elif granularity:
        df_grouped = df_grouped.sort_values(by=x_col)

    labels = df_grouped[x_col].astype(str).tolist()
    values = df_grouped[y_col].tolist()
    scatter_data = [{"x": l, "y": v} for l, v in zip(labels, values)]

    # Colores
    is_time_series = config.get('TimeSeries', False) or config.get('ShowEvolution', False) or granularity is not None
    bg_colors, border_colors = get_colors(len(labels), is_time_series)

    # Autocompletado del UVL
    if config.get('ShowEvolution') or config.get('DeviationOverTime'):
        user_input['config']['Line'] = True
    elif config.get('IrregularIntervals') or config.get('NonZeroScale'):
        user_input['config']['Point'] = True
    elif any(config.get(k) for k in ['CompareSizes', 'EmphasizeIndividual', 'EmphasizeLarger', 'EmphasizeSmaller', 'TouchingBars', 'StackedBars', 'BaseDifference']):
        user_input['config']['Bar'] = True

    if config.get('TouchingBars'): user_input['config']['NoGap'] = True
    if config.get('StackedBars'): user_input['config']['Stacked'] = True

    op_display = {"sum": "Total", "mean": "Promedio", "count": "Recuento"}
    
    user_input['config']['labels'] = labels
    user_input['config']['values'] = values
    user_input['config']['scatter_data'] = scatter_data
    user_input['config']['backgroundColor'] = bg_colors
    user_input['config']['borderColor'] = border_colors
    user_input['config']['TitleText'] = f"{op_display.get(agg_func, 'Datos')} de {y_col} por {x_col}"

    with open(TEMP_REQUEST_FILE, 'w', encoding='utf-8') as f:
        json.dump(user_input, f, indent=2)

    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    # Llamada al motor
    cmd = [sys.executable, "derivation_engine.py", "-fm", UVL_FILE, "-c", TEMP_REQUEST_FILE, "-t", TEMPLATE_FILE, "-m", MAPPING_FILE]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=BASE_DIR)

    if result.returncode != 0:
        raise RuntimeError(f"Error ejecutando UVEngine.\nSTDOUT: {result.stdout}\nSTDERR: {result.stderr}")

    if not os.path.exists(OUTPUT_FILE):
         raise FileNotFoundError("El motor terminó bien, pero no generó el archivo de salida")

    with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)