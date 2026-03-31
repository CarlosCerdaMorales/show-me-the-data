import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import DynamicChart from '../DynamicChart';
import './css/StepResult.css';

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
    <div className="result-container">
      <div className="result-header">
        <div>
          <h2 className="result-title">Visualización Generada</h2>
          <p className="result-subtitle">Basada en la configuración derivada de la línea de productos de software.</p>
        </div>
        <button onClick={onBack} className="result-back-btn">
          ← Modificar variables
        </button>
      </div>

      {chartConfig ? (
        <div className="result-content">
          <div ref={chartRef} className="result-chart-box">
            <DynamicChart config={chartConfig} />
          </div>

          <div className="result-actions">
            <button onClick={downloadChart} className="result-download-btn">
               Descargar PNG
            </button>
          </div>
        </div>
      ) : (
        <div className="result-empty">
          <p className="result-empty-text">No se pudo generar el JSON de configuración de la gráfica.</p>
        </div>
      )}
    </div>
  );
};

export default StepResult;