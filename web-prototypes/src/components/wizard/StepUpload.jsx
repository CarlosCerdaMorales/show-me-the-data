import React from 'react';

const StepUpload = ({ onFileUpload, csvData, onConfirm, loading, error }) => {
  return (
    <div>
      <h2>Ingesta de Datos</h2>
      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept=".csv" onChange={onFileUpload} />
        {loading && <span style={{ marginLeft: '10px' }}>Analizando...</span>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {csvData && (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'black', margin: 0 }}>Vista Previa ({csvData.total_rows} filas)</h3>
            
            <button 
              onClick={onConfirm}
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '6px 15px', 
                borderRadius: '4px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Continuar
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
                  {csvData.columns.map((col, index) => (
                    <th key={index} style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #555' }}>
                      {col} <br/>
                      <span style={{ 
                        backgroundColor: csvData.types[col] === 'Fecha' ? '#007bff' : csvData.types[col] === 'Numérico' ? '#28a745' : '#6c757d', 
                        padding: '2px 6px', borderRadius: '4px', fontSize: '0.75em' 
                      }}>
                        {csvData.types[col]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.preview.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    {csvData.columns.map((col, j) => (
                      <td key={j} style={{ padding: '8px', borderBottom: '1px solid #eee', color: '#333' }}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepUpload;