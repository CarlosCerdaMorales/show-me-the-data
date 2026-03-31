import React, { useState } from 'react';
import SalesChartJS from '../components/SalesChartJS';
import './css/TestTemporalSeries.css';

const TestTemporalSeries = () => {
  const [visualizacion, setVisualizacion] = useState('line');

  return (
    <div className="test-container">
      <h1 className="test-title">
        Test Conceptual: Series Temporales
      </h1>
      
      <p className="test-intro">
        Esta pantalla es una <strong>pequeña demostración interactiva</strong> del marco teórico de Stephen Few que fundamenta el proyecto. Sirve como 
        ejemplo básico de cómo la intención analítica altera la representación visual de una serie temporal. Para utilizar el motor de recomendación completo 
        (con carga de CSV, derivación UVL y configuración dinámica), visita la pestaña del <strong>Prototipo Real</strong> en el menú superior.
      </p>

      <div className="test-controls-section">
        <h3 className="test-controls-title">
          ¿Qué objetivo persigue tu análisis en este momento?
        </h3>
        
        <div className="test-buttons-wrapper">
          <button 
            onClick={() => setVisualizacion('line')}
            className={`test-btn ${visualizacion === 'line' ? 'test-btn-active' : 'test-btn-inactive'}`}
          >
            Ver Tendencia y Evolución
          </button>

          <button 
            onClick={() => setVisualizacion('bar')}
            className={`test-btn ${visualizacion === 'bar' ? 'test-btn-active' : 'test-btn-inactive'}`}
          >
            Comparar Valores Mes a Mes
          </button>
        </div>
        
        <div className="test-justification-box">
          <p className="test-justification-text">
            <strong>Justificación Teórica:</strong><br/>
            {visualizacion === 'line' 
              ? "Las líneas conectadas son la mejor representación para mostrar patrones de cambio, tendencias y fluctuaciones a lo largo " + 
              "de un período continuo de tiempo, según S. Few."
              : "Para comparar magnitudes individuales discretas, las barras verticales permiten apreciar mejor la diferencia de valores sin " +
              "distraer con la forma de la tendencia global."}
          </p>
        </div>
      </div>

      <div className="test-chart-container">
        <div className="test-chart-inner">
          <SalesChartJS tipoVista={visualizacion} />
        </div>
      </div>
    </div>
  );
};

export default TestTemporalSeries;