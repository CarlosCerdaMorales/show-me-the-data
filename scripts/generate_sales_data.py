import pandas as pd
import random
from datetime import datetime, timedelta
import os

NUM_ROWS = 1000
START_DATE = datetime(2025, 1, 1)
END_DATE = datetime(2025, 12, 31) 

CATEGORIES = ['Electrónica', 'Ropa', 'Hogar', 'Juguetes', 'Libros']
REGIONS = ['Norte', 'Sur', 'Este', 'Oeste']

data = []

print(f"Generando {NUM_ROWS} filas de datos estrictamente para el año 2025...")

delta_days = (END_DATE - START_DATE).days

for _ in range(NUM_ROWS):
    days_offset = random.randint(0, delta_days)
    date = START_DATE + timedelta(days=days_offset)
    
    category = random.choice(CATEGORIES)
    region = random.choice(REGIONS)
    quantity = random.randint(1, 10)
    
    base_price = {
        'Electrónica': 150, 'Ropa': 30, 'Hogar': 80, 
        'Juguetes': 25, 'Libros': 15
    }[category]
    
    price = round(base_price * random.uniform(0.8, 1.2), 2)
    total_sales = round(price * quantity, 2)
    
    data.append([date, category, region, quantity, price, total_sales])

df = pd.DataFrame(data, columns=['Fecha', 'Categoria', 'Region', 'Cantidad', 'Precio_Unitario', 'Ventas_Totales'])

output_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
os.makedirs(output_dir, exist_ok=True)
file_name = os.path.join(output_dir, 'ventas_tienda_online.csv')

df.to_csv(file_name, index=False, sep=';', decimal=',', date_format='%d-%m-%Y')

print(f"Dataset generado en: {file_name}")