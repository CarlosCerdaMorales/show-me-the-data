import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import DynamicChart from '../DynamicChart';

const StepResult = ({ chartConfig, onBack }) => {
  const chartRef = useRef(null);

  const downloadChart = async () => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: '#ffffff', 
      scale: 3,
      logging: false,
      useCORS: true
    });

    const link = document.createElement('a');
    link.download = `grafica-${chartConfig.type || 'resultado'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="step-result-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="heading-main">Resultado de Visualización</h2>
          <p className="text-muted">La gráfica se ha generado siguiendo los principios de Stephen Few.</p>
        </div>
        <button onClick={onBack} className="btn-link" style={{ color: 'var(--text-secondary)', cursor: 'pointer', background: 'none', border: 'none' }}>
          ← Ajustar variables
        </button>
      </div>

      {chartConfig ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div 
            ref={chartRef}
            style={{ 
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '12px',
              minHeight: '450px',
              border: '1px solid var(--border-color)'
            }}
          >
            <DynamicChart config={chartConfig} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button 
              onClick={downloadChart}
              className="btn-primary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: 'gray',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'black',
                fontWeight: 'bold'
              }}
            >
               Guardar Imagen 📷
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <p className="text-muted">Error en la generación del JSON de configuración.</p>
        </div>
      )}
    </div>
  );
};

export default StepResult;