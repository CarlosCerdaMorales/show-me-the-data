import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import os
import uuid
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from domains.domains import DOMAINS

def generate_random_dataset():
    domain_name = random.choice(list(DOMAINS.keys()))
    domain = DOMAINS[domain_name]
    num_rows = random.randint(500, 10000)

    selected_cols = { "dates": domain["dates"], "categories": [], "numerics": [] }
    
    cat_keys = list(domain["categories"].keys())
    selected_cols["categories"] = random.sample(cat_keys, random.randint(2, len(cat_keys)))
    
    num_keys = list(domain["numerics"].keys())
    selected_cols["numerics"] = random.sample(num_keys, random.randint(2, len(num_keys)))

    data = {}

    start_date = datetime.now() - timedelta(days=365)
    for date_col in selected_cols["dates"]:
        data[date_col] = [start_date + timedelta(days=random.randint(0, 365), hours=random.randint(0, 23)) for _ in range(num_rows)]

    for cat_col in selected_cols["categories"]:
        options = domain["categories"][cat_col]
        weights = [random.uniform(0.1, 1.0) for _ in options] 
        data[cat_col] = random.choices(options, weights=weights, k=num_rows)

    for num_col in selected_cols["numerics"]:
        rules = domain["numerics"][num_col]
        if rules["type"] == int:
            data[num_col] = np.random.randint(rules["min"], rules["max"] + 1, size=num_rows)
        else:
            data[num_col] = np.round(np.random.uniform(rules["min"], rules["max"], size=num_rows), 2)

    df = pd.DataFrame(data)

    if selected_cols["numerics"]:
        col_to_corrupt = random.choice(selected_cols["numerics"])
        mask = np.random.choice([True, False], size=num_rows, p=[0.01, 0.99])
        df.loc[mask, col_to_corrupt] = np.nan

    output_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'raw')
    os.makedirs(output_dir, exist_ok=True)
    
    unique_id = str(uuid.uuid4())[:8]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M")
    filename = f"{domain_name.lower()}_stress_{timestamp}_{unique_id}.csv"
    
    file_path = os.path.join(output_dir, filename)

    df.to_csv(file_path, index=False, sep=';', decimal=',', date_format='%Y-%m-%d %H:%M:%S')
    
    print(f"Dataset generado exitosamente: {file_path}")

if __name__ == "__main__":
    generate_random_dataset()

# python scripts/generate_stress_datasets.py