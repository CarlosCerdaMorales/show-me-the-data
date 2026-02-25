import React from 'react';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DynamicChart = ({ config }) => {
  if (!config || !config.data) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Cargando datos de la gráfica...
      </div>
    );
  }

  const containerStyle = {
    width: '100%',
    height: '400px',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      {config.type === 'line' && (
        <Line data={config.data} options={config.options} />
      )}
      
      {(config.type === 'bar' || config.type === 'bar-stacked') && (
        <Bar data={config.data} options={config.options} />
      )}

      {config.type === 'scatter' && (
        <Scatter data={config.data} options={config.options} />
      )}

      {!['line', 'bar', 'bar-stacked', 'scatter'].includes(config.type) && (
        <Bar data={config.data} options={config.options} />
      )}
    </div>
  );
};

export default DynamicChart;