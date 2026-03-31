import React from 'react';
import SalesChartJS from '../components/SalesChartJS';
import SalesD3 from '../components/SalesD3';
import './css/FirstComparison.css';

const FirstComparison = () => {
  return (
    <div className="comparison-container">
      <h1 className="comparison-title">
        Comparativa Técnica: ChartJS vs. D3.js
      </h1>
      
      <p className="comparison-intro">
        Este test técnico forma parte del <strong>benchmarking de herramientas de visualización de datos</strong> realizado en el TFG, donde se han analizado 
        Microsoft Power BI, ChartJS y D3.js. En este prototipo web nos centramos exclusivamente en las soluciones basadas en código para medir tiempos de desarrollo, 
        facilidad de implementación y flexibilidad. Las visualizaciones presentadas a continuación utilizan el mismo dataset de ejemplo para permitir una comparación 
        justa del rendimiento y la estética por defecto de cada librería.
      </p>

      <div className="comparison-section">
        <h3 className="comparison-section-title">
           1. Implementación con ChartJS
        </h3>
        
        <div className="comparison-chart-wrapper">
          <div className="comparison-chart-inner">
            <SalesChartJS />
          </div>
          <p className="comparison-caption">Gráfico renderizado con Canvas (Chart.js)</p>
        </div>
      </div>

      <div className="comparison-section-last">
        <h3 className="comparison-section-title">
           2. Implementación con D3.js
        </h3>
        
        <div className="comparison-chart-wrapper">
          <div className="comparison-chart-inner-hidden">
            <SalesD3 />
          </div>
          <p className="comparison-caption">Gráfico renderizado con SVG (D3.js)</p>
        </div>
      </div>
    </div>
  );
};

export default FirstComparison;