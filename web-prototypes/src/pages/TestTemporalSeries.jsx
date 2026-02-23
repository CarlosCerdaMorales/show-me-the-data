import { useState } from 'react';
import SalesChartJS from '../components/SalesChartJS';

function App() {
  const [visualizacion, setVisualizacion] = useState('line');

  return (
    <div className="App">
      <h1>Prototipo TFG: Recomendador de Visualización</h1>
      <p style={{ color: 'white' }}>
        Dataset: Ventas 2025 | Teoría: S. Few (Show Me the Numbers)
      </p>

      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ color: '#333' }}>¿Qué objetivo persigue tu análisis?</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            onClick={() => setVisualizacion('line')}
            style={{
              padding: '10px 20px',
              backgroundColor: visualizacion === 'line' ? '#007bff' : '#e0e0e0',
              color: visualizacion === 'line' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Ver Tendencia y Evolución
          </button>

          <button 
            onClick={() => setVisualizacion('bar')}
            style={{
              padding: '10px 20px',
              backgroundColor: visualizacion === 'bar' ? '#ff6384' : '#e0e0e0',
              color: visualizacion === 'bar' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Comparar Valores Mes a Mes
          </button>
        </div>
        
        <p style={{ fontSize: '0.9em', marginTop: '15px', color: '#555' }}>
          <strong>Justificación Teórica:</strong> {visualizacion === 'line' 
            ? "Las líneas conectadas son ideales para mostrar patrones de cambio y flujos continuos en el tiempo."
            : "Las barras verticales enfatizan los valores individuales, facilitando la comparación discreta entre meses sin sugerir continuidad."}
        </p>
      </div>

      <div style={{ width: '800px', margin: '0 auto' }}>
        <SalesChartJS tipoVista={visualizacion} />
      </div>
    </div>
  );
}

export default App;