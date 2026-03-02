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
  Filler // Importante para el 'fill: true' (ShowEvolution)
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Registramos todos los componentes necesarios
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

  // Chart.js necesita que 'type' sea minúscula ('line', 'bar')
  // Nuestra plantilla ya lo devuelve así, perfecto.

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