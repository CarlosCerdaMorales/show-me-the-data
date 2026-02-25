import React from 'react';
import DynamicChart from '../DynamicChart'; 

const StepResult = ({ chartConfig, onBack }) => {
  return (
    <div className="step-result-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Resultado de Visualización</h2>
        <button 
          onClick={onBack} 
          style={{ 
            color: '#007bff', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          ← Ajustar configuración
        </button>
      </div>

      {chartConfig ? (
        <div style={{ 
          backgroundColor: '#fff', 
          border: '1px solid #e1e4e8', 
          padding: '24px', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <DynamicChart config={chartConfig} />
          
          <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <details style={{ cursor: 'pointer' }}>
              <summary style={{ color: '#666', fontSize: '13px' }}>
                Ver configuración técnica resuelta (UVL + Plantilla)
              </summary>
              <pre style={{ 
                fontSize: '11px', 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '6px',
                marginTop: '10px',
                overflowX: 'auto',
                color: '#333',
                border: '1px solid #ddd'
              }}>
                {JSON.stringify(chartConfig, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No se pudo generar la configuración de la gráfica.</p>
        </div>
      )}
    </div>
  );
};

export default StepResult;