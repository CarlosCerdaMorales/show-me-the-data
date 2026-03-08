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

"""
Funciones de análisis y procesamiento de datos para el motor de derivación de gráficos.
"""

def _load_csv(filepath):
    """Carga el CSV intentando diferentes separadores."""
    try:
        df = pd.read_csv(filepath, sep=';', decimal=',')
        if len(df.columns) < 2: raise ValueError()
        return df
    except:
        return pd.read_csv(filepath, sep=',', decimal='.')

def _detect_column_types(df):
    """Detecta si las columnas son numéricas, fechas o texto."""
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
    return column_types

def _generate_part_to_whole_suggestions(column_types):
    """Genera sugerencias de agrupaciones para gráficos de Partes de un Todo."""
    categorical_cols = [col for col, t in column_types.items() if t == 'Texto/Categoría']
    numeric_cols = [col for col, t in column_types.items() if t == 'Numérico']
    
    suggestions = []
    for cat in categorical_cols:
        for num in numeric_cols:
            suggestions.append({
                "agrupador": cat,
                "metrica": num,
                "descripcion": f"Proporción de {num} dividida por {cat}"
            })
    return suggestions

def analyze_csv_file(filepath):
    """Función principal expuesta para analizar un archivo CSV subido."""
    df = _load_csv(filepath)
    column_types = _detect_column_types(df)
    pt_suggestions = _generate_part_to_whole_suggestions(column_types)

    return list(df.columns), df.head(5).to_dict(orient='records'), column_types, len(df), pt_suggestions


"""
Funciones internas para procesar los datos y configurar la entrada para el motor de derivación.
"""

def _autocomplete_uvl_config(config):
    """Infiere características visuales basándose en las intenciones del usuario."""
    completed_config = config.copy()
    if config.get('ShowEvolution') or config.get('DeviationOverTime'):
        completed_config['Line'] = True
    elif config.get('IrregularIntervals') or config.get('NonZeroScale'):
        completed_config['Point'] = True
    elif any(config.get(k) for k in ['CompareSizes', 'EmphasizeIndividual', 'EmphasizeLarger', 'EmphasizeSmaller', 'TouchingBars', 'StackedBars', 'BaseDifference']):
        completed_config['Bar'] = True

    if config.get('TouchingBars'): completed_config['NoGap'] = True
    if config.get('StackedBars'): completed_config['Stacked'] = True
    
    return completed_config

def _clean_and_format_dates(df, x_col, granularity):
    """Limpia valores nulos y aplica la granularidad temporal si se solicita."""
    df_clean = df.dropna().copy()
    if granularity:
        df_clean[x_col] = pd.to_datetime(df_clean[x_col], dayfirst=True, errors='coerce')
        df_clean = df_clean.dropna(subset=[x_col])
        if granularity == 'year': df_clean[x_col] = df_clean[x_col].dt.to_period('Y')
        elif granularity == 'month_year': df_clean[x_col] = df_clean[x_col].dt.to_period('M')
    return df_clean

def _process_grouped_data(df_clean, x_col, y_col, group_by, agg_func, granularity):
    """Procesa los datos cuando hay una variable secundaria de agrupación (Barras Apiladas)."""
    group_cols = [x_col, group_by]
    df_grouped = df_clean.groupby(group_cols)[y_col].agg(agg_func).reset_index()
    df_pivot = df_grouped.pivot(index=x_col, columns=group_by, values=y_col).fillna(0)
    
    if granularity: 
        df_pivot = df_pivot.sort_index()

    labels = df_pivot.index.astype(str).tolist()
    datasets = []
    
    for i, col in enumerate(df_pivot.columns):
        datasets.append({
            "label": str(col),
            "data": df_pivot[col].tolist(),
            "backgroundColor": f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 0.8)',
            "borderColor": f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 1)',
            "borderWidth": 1
        })
        
    return labels, datasets

def _process_simple_data(df_clean, x_col, y_col, agg_func, granularity, config):
    """Procesa los datos para gráficos simples (Líneas, Barras simples, Puntos)."""
    df_grouped = df_clean.groupby(x_col)[y_col].agg(agg_func).reset_index()
    
    # Aplicar ordenación de ranking
    if config.get('EmphasizeLarger'):
        df_grouped = df_grouped.sort_values(by=y_col, ascending=False)
        config['SortedDesc'] = True
    elif config.get('EmphasizeSmaller'):
        df_grouped = df_grouped.sort_values(by=y_col, ascending=True)
        config['SortedAsc'] = True
    elif granularity:
        df_grouped = df_grouped.sort_values(by=x_col)

    labels = df_grouped[x_col].astype(str).tolist()
    values = df_grouped[y_col].tolist()
    
    # Determinar si aplicamos colores de serie temporal o multicolores
    is_time_series = config.get('TimeSeries', False) or config.get('ShowEvolution', False) or granularity is not None
    
    if not is_time_series:
        bg_colors = [f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 0.6)' for i in range(len(labels))]
        border_colors = [f'rgba({FEW_PALETTE[i % len(FEW_PALETTE)][0]}, {FEW_PALETTE[i % len(FEW_PALETTE)][1]}, {FEW_PALETTE[i % len(FEW_PALETTE)][2]}, 1)' for i in range(len(labels))]
    else:
        bg_colors = f"rgba({FEW_PALETTE[1][0]}, {FEW_PALETTE[1][1]}, {FEW_PALETTE[1][2]}, 0.2)"
        border_colors = f"rgba({FEW_PALETTE[1][0]}, {FEW_PALETTE[1][1]}, {FEW_PALETTE[1][2]}, 1)"

    op_display = {"sum": "Total", "mean": "Promedio", "count": "Recuento"}
    final_data = [{"x": l, "y": v} for l, v in zip(labels, values)] if config.get('Point') else values

    datasets = [{
        "label": f"{op_display.get(agg_func, 'Datos')} de {y_col} por {x_col}",
        "data": final_data,
        "backgroundColor": bg_colors,
        "borderColor": border_colors,
        "borderWidth": 1,
        "fill": False,
        "tension": 0.4 if config.get('ShowEvolution') else 0,
        "pointRadius": 6 if config.get('Point') else 3,
        "pointHoverRadius": 8 if config.get('Point') else 4
    }]
    
    return labels, datasets, config

def _execute_uvengine(user_input):
    """Guarda el archivo temporal de entrada, ejecuta el motor y lee el resultado."""
    with open(TEMP_REQUEST_FILE, 'w', encoding='utf-8') as f:
        json.dump(user_input, f, indent=2)

    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    cmd = [sys.executable, "derivation_engine.py", "-fm", UVL_FILE, "-c", TEMP_REQUEST_FILE, "-t", TEMPLATE_FILE, "-m", MAPPING_FILE]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=BASE_DIR)

    if result.returncode != 0:
        raise RuntimeError(f"Error ejecutando UVEngine.\nSTDOUT: {result.stdout}\nSTDERR: {result.stderr}")

    if not os.path.exists(OUTPUT_FILE):
         raise FileNotFoundError("El motor terminó bien, pero no generó el archivo de salida")

    with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def process_and_run_engine(user_input):
    """Función principal que orquesta todo el procesamiento y la derivación de la gráfica."""
    if not os.path.exists(UPLOADED_CSV_PATH):
        raise FileNotFoundError("CSV no encontrado en el servidor")

    config = user_input.get('config', {})
    mapping = config.get('mapping', {})
    
    x_col = mapping.get('x')
    y_col = mapping.get('y')
    group_by = mapping.get('groupBy')
    granularity = mapping.get('granularity')
    agg_func = mapping.get('aggregate', 'sum')

    df = _load_csv(UPLOADED_CSV_PATH)
    
    if x_col not in df.columns or y_col not in df.columns:
         raise ValueError(f"Las columnas {x_col} o {y_col} no existen en el CSV cargado.")

    config = _autocomplete_uvl_config(config)

    cols_to_keep = [x_col, y_col]
    if group_by: cols_to_keep.append(group_by)
    
    df_clean = _clean_and_format_dates(df[cols_to_keep], x_col, granularity)

    if group_by and config.get('PartToWhole'):
        labels, datasets = _process_grouped_data(df_clean, x_col, y_col, group_by, agg_func, granularity)
    else:
        labels, datasets, config = _process_simple_data(df_clean, x_col, y_col, agg_func, granularity, config)

    user_input['config'] = config
    user_input['config']['labels'] = labels
    user_input['config']['datasets'] = datasets

    return _execute_uvengine(user_input)