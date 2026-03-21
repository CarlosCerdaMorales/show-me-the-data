import React from 'react';
import SalesChartJS from '../components/SalesChartJS';
import SalesD3 from '../components/SalesD3';

const FirstComparison = () => {
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
        Comparativa Técnica: ChartJS vs. D3.js
      </h1>
      
      <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px', color: '#4b5563', textAlign: 'left' }}>
        Este test técnico forma parte del <strong>benchmarking de herramientas de visualización de datos</strong> realizado en el TFG, donde se han analizado 
        Microsoft Power BI, ChartJS y D3.js. En este prototipo web nos centramos exclusivamente en las soluciones basadas en código para medir tiempos de desarrollo, 
        facilidad de implementación y flexibilidad. Las visualizaciones presentadas a continuación utilizan el mismo dataset de ejemplo para permitir una comparación 
        justa del rendimiento y la estética por defecto de cada librería.
      </p>

      <div style={{ 
        border: '1px solid #e5e7eb', 
        padding: '32px', 
        borderRadius: '8px',
        marginBottom: '40px',
        backgroundColor: '#f9fafb'
      }}>
        <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '24px', fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
           1. Implementación con ChartJS
        </h3>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', backgroundColor: '#ffffff', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ minHeight: '350px' }}>
            <SalesChartJS />
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '15px 0 0 0', textAlign: 'center', fontStyle: 'italic' }}>Gráfico renderizado con Canvas (Chart.js)</p>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #e5e7eb', 
        padding: '32px', 
        borderRadius: '8px',
        backgroundColor: '#f9fafb'
      }}>
        <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '24px', fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
           2. Implementación con D3.js
        </h3>
        
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', backgroundColor: '#ffffff', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ minHeight: '350px', overflow: 'hidden' }}>
            <SalesD3 />
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '15px 0 0 0', textAlign: 'center', fontStyle: 'italic' }}>Gráfico renderizado con SVG (D3.js)</p>
        </div>
      </div>
    </div>
  );
};

export default FirstComparison;