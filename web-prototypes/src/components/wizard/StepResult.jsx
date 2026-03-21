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
    <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ color: '#111827', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>Visualización Generada</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Basada en la configuración derivada de la línea de productos de software.</p>
        </div>
        <button onClick={onBack} style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          ← Modificar variables
        </button>
      </div>

      {chartConfig ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div 
            ref={chartRef}
            style={{ 
              backgroundColor: '#ffffff',
              padding: '32px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              minHeight: '450px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DynamicChart config={chartConfig} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={downloadChart}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#374151',
                fontWeight: '500',
                fontSize: '14px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                transition: 'background-color 0.2s'
              }}
            >
               Descargar PNG
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px 32px', border: '1px dashed #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <p style={{ color: '#6b7280', margin: 0, fontWeight: '500' }}>No se pudo generar el JSON de configuración de la gráfica.</p>
        </div>
      )}
    </div>
  );
};

export default StepResult;