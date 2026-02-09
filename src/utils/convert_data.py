import pandas as pd
import os
import sys

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from src.utils.config import DATA_DIR, CLINICAL_DIR

def convert_clinical_data():
    # Look for the excel file in the data directory (and one level up)
    search_dirs = [DATA_DIR, os.path.dirname(DATA_DIR)]
    excel_files = []
    for d in search_dirs:
        if os.path.exists(d):
            found = [os.path.join(d, f) for f in os.listdir(d) if f.endswith('.xlsx')]
            excel_files.extend(found)
    
    if not excel_files:
        print(f"No .xlsx files found in {search_dirs}")
        return

    excel_path = excel_files[0]
    print(f"Found clinical data: {excel_path}")
    
    try:
        df = pd.read_excel(excel_path)
        
        # Ensure clinical directory exists
        os.makedirs(CLINICAL_DIR, exist_ok=True)
        
        output_path = os.path.join(CLINICAL_DIR, 'oasis_clinical.csv')
        df.to_csv(output_path, index=False)
        print(f"Successfully converted to {output_path}")
        print(f"Columns: {df.columns.tolist()}")
        
    except Exception as e:
        print(f"Error converting clinical data: {str(e)}")

if __name__ == "__main__":
    convert_clinical_data()
