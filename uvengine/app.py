import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS

from chart_logic import CSVAnalyzer, ChartEngineOrchestrator, UPLOADED_CSV_PATH

app = Flask(__name__)
CORS(app)

@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Nombre de archivo vacío"}), 400

    try:
        file.save(UPLOADED_CSV_PATH)
        
        columns, preview, types, total_rows, unique_counts = CSVAnalyzer.analyze(UPLOADED_CSV_PATH)
        
        return jsonify({
            "columns": columns,
            "preview": preview,
            "types": types,
            "total_rows": total_rows,
            "unique_counts": unique_counts
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/generate-chart', methods=['POST'])
def generate_chart():
    try:
        payload = request.json
        
        config = payload.get('config', {})
        mapping = config.get('mapping', {})
        
        if not mapping.get('x') or not mapping.get('y'):
            return jsonify({"error": "Validación fallida: Faltan las variables X o Y obligatorias en el mapeo."}), 400
            
        if mapping.get('groupBy') and mapping.get('x') == mapping.get('groupBy'):
            return jsonify({"error": "Validación fallida: La subcategoría de agrupación no puede ser idéntica al Eje X."}), 400
        
        if mapping.get('groupBy') and mapping.get('y') == mapping.get('groupBy'):
            return jsonify({"error": "Validación fallida: La subcategoría de agrupación no puede ser idéntica al Eje Y."}), 400
                
        resolved_chart_json = ChartEngineOrchestrator.process_and_run(payload)
        return jsonify(resolved_chart_json)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)