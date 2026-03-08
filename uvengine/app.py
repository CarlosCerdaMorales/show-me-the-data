import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS

from chart_logic import analyze_csv_file, process_and_run_engine, UPLOADED_CSV_PATH

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

        columns, preview, types, total_rows = analyze_csv_file(UPLOADED_CSV_PATH)
        
        return jsonify({
            "columns": columns,
            "preview": preview,
            "types": types,
            "total_rows": total_rows
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/generate-chart', methods=['POST'])
def generate_chart():
    try:
        resolved_chart_json = process_and_run_engine(request.json)
        return jsonify(resolved_chart_json)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)