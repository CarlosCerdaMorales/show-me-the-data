import { useState } from 'react';
import axios from 'axios';
import DynamicChart from '../components/DynamicChart'

const Proto = () => {
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartConfig, setChartConfig] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setCsvData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Datos del CSV:", response.data);
      setCsvData(response.data);
    } catch (err) {
      console.error(err);
      setError("Error al procesar el archivo. Asegúrate de que el Backend (app.py) esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  const generarGraficaEnPython = async (tipoIntencion) => {
    setLoading(true);
    try {
      const configParaElMotor = {
        "TimeSeries": true,
        "ShowTrend": tipoIntencion === 'linea',
        "CompareValues": tipoIntencion === 'barras',
        "LineChart": tipoIntencion === 'linea',
        "BarChart": tipoIntencion === 'barras',
        "GridLines": true
      };

      const response = await axios.post('http://localhost:5000/generate-chart', configParaElMotor);
      setChartConfig(response.data);
    } catch (error) {
      console.error("Error UVL:", error);
      alert("Error conectando con el motor UVL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Prototipo TFG: Ingesta de Datos</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <p>1. Sube tu archivo CSV (Separador: <code>;</code> | Decimales: <code>,</code> | Fecha: <code>dd-mm-yyyy</code>)</p>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {loading && <span style={{ marginLeft: '10px', color: '#007bff' }}>Procesando...</span>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>❌ {error}</p>}
      </div>

      {csvData && (
        <div style={{ marginBottom: '40px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Vista Previa ({csvData.total_rows} filas)</h3>
            <button style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
              Confirmar Datos
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                  {csvData.columns.map((col, index) => (
                    <th key={index} style={{ padding: '12px 15px', textAlign: 'left', borderRight: '1px solid #454d55' }}>
                      {col}
                      <br/>
                      {(() => {
                        let bgColor = '#6c757d';
                        if (csvData.types[col] === 'Numérico') bgColor = '#28a745';
                        if (csvData.types[col] === 'Fecha') bgColor = '#007bff';

                        return (
                          <span style={{ 
                            backgroundColor: bgColor, 
                            color: 'white', 
                            fontSize: '0.75em', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            marginTop: '5px',
                            display: 'inline-block',
                            fontWeight: 'normal'
                          }}>
                            {csvData.types[col]}
                          </span>
                        );
                      })()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.preview.map((row, rowIndex) => (
                  <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f2f2f2' }}>
                    {csvData.columns.map((col, colIndex) => (
                      <td key={colIndex} style={{ padding: '10px 15px', borderBottom: '1px solid #ddd', color: '#333' }}>
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '2px dashed #ccc' }}>
        <h3>2. Prueba de Motor SPL (Gráficas)</h3>
        <p style={{ color: '#666' }}>Esto usa datos simulados por ahora, no los del CSV.</p>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => generarGraficaEnPython('linea')} style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}>Tendencia (Líneas)</button>
          <button onClick={() => generarGraficaEnPython('barras')} style={{ padding: '10px', cursor: 'pointer' }}>Comparación (Barras)</button>
        </div>
        
        {chartConfig && (
          <div style={{ border: '1px solid #ccc', padding: '20px' }}>
            <DynamicChart config={chartConfig} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Proto;