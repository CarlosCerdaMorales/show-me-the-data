import React from 'react';
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
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DynamicChart = ({ config }) => {
  if (!config) return <p>Cargando visualización...</p>;

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Chart
        type={config.type} 
        data={config.data}
        options={config.options}
      />
    </div>
  );
};

export default DynamicChart;