import React from 'react';

const StepUpload = ({ onFileUpload, csvData, onConfirm, loading, error }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <h2 style={{ color: '#111827', marginTop: 0, marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Ingesta de Datos</h2>
      
      <div style={{ 
        border: '2px dashed #d1d5db', 
        borderRadius: '8px', 
        padding: '32px', 
        textAlign: 'center',
        marginBottom: '32px',
        backgroundColor: '#f9fafb'
      }}>
        <input 
          type="file" 
          accept=".csv" 
          onChange={onFileUpload} 
          style={{ cursor: 'pointer', color: '#4b5563' }}
        />
        {loading && <div style={{ marginTop: '12px', color: '#4f46e5', fontWeight: '500' }}>Analizando documento...</div>}
        {error && <div style={{ marginTop: '12px', color: '#dc2626', fontWeight: '500' }}>{error}</div>}
      </div>

      {csvData && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: '#111827', margin: 0, fontSize: '16px', fontWeight: '600' }}>Vista Previa</h3>
              <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '13px' }}>{csvData.total_rows} filas detectadas</p>
            </div>
            <button 
              onClick={onConfirm}
              style={{ 
                backgroundColor: '#4f46e5', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: '500',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
            >
              Continuar al análisis
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  {csvData.columns.map((col, index) => (
                    <th key={index} style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', color: '#374151', fontWeight: '600' }}>
                      <div style={{ marginBottom: '6px' }}>{col}</div>
                      <span style={{ 
                        backgroundColor: csvData.types[col] === 'Fecha' ? '#dbeafe' : csvData.types[col] === 'Numérico' ? '#d1fae5' : '#f3f4f6', 
                        color: csvData.types[col] === 'Fecha' ? '#1e40af' : csvData.types[col] === 'Numérico' ? '#065f46' : '#4b5563',
                        padding: '2px 8px', 
                        borderRadius: '9999px', 
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {csvData.types[col]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.preview.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                    {csvData.columns.map((col, j) => (
                      <td key={j} style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>{row[col]}</td>
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