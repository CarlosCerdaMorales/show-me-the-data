import React, { useState } from 'react';
import SalesChartJS from '../components/SalesChartJS';

const TestTemporalSeries = () => {
  const [visualizacion, setVisualizacion] = useState('line');

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '48px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      maxWidth: '900px',
      margin: '0 auto',
      color: '#374151'
    }}>
      <h1 style={{ color: '#111827', fontSize: '28px', fontWeight: '700', marginBottom: '12px', marginTop: 0 }}>
        Test Conceptual: Series Temporales
      </h1>
      
      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', color: '#4b5563' }}>
        Esta pantalla es una <strong>pequeña demostración interactiva</strong> del marco teórico de Stephen Few que fundamenta el proyecto. Sirve como 
        ejemplo básico de cómo la intención analítica altera la representación visual de una serie temporal. Para utilizar el motor de recomendación completo 
        (con carga de CSV, derivación UVL y configuración dinámica), visita la pestaña del <strong>Prototipo Real</strong> en el menú superior.
      </p>

      <div style={{ 
        border: '1px solid #e5e7eb', 
        padding: '32px', 
        borderRadius: '8px',
        marginBottom: '32px',
        backgroundColor: '#f9fafb'
      }}>
        <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '24px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
          ¿Qué objetivo persigue tu análisis en este momento?
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setVisualizacion('line')}
            style={{
              padding: '12px 24px',
              backgroundColor: visualizacion === 'line' ? '#4f46e5' : '#ffffff',
              color: visualizacion === 'line' ? '#ffffff' : '#374151',
              border: visualizacion === 'line' ? '1px solid #4f46e5' : '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease',
              boxShadow: visualizacion === 'line' ? '0 4px 6px rgba(79, 70, 229, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            Ver Tendencia y Evolución
          </button>

          <button 
            onClick={() => setVisualizacion('bar')}
            style={{
              padding: '12px 24px',
              backgroundColor: visualizacion === 'bar' ? '#4f46e5' : '#ffffff',
              color: visualizacion === 'bar' ? '#ffffff' : '#374151',
              border: visualizacion === 'bar' ? '1px solid #4f46e5' : '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s ease',
              boxShadow: visualizacion === 'bar' ? '0 4px 6px rgba(79, 70, 229, 0.2)' : '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            Comparar Valores Mes a Mes
          </button>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: '#eef2ff', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
          <p style={{ fontSize: '14px', margin: 0, color: '#312e81', lineHeight: '1.6' }}>
            <strong>Justificación Teórica:</strong><br/>
            {visualizacion === 'line' 
              ? "Las líneas conectadas son la mejor representación para mostrar patrones de cambio, tendencias y fluctuaciones a lo largo " + 
              "de un período continuo de tiempo, según S. Few."
              : "Para comparar magnitudes individuales discretas, las barras verticales permiten apreciar mejor la diferencia de valores sin " +
              "distraer con la forma de la tendencia global."}
          </p>
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        minHeight: '400px', 
        padding: '24px', 
        backgroundColor: '#ffffff', 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '750px' }}>
          <SalesChartJS tipoVista={visualizacion} />
        </div>
      </div>
    </div>
  );
};

export default TestTemporalSeries;