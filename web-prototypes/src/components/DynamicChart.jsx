import { Line, Bar } from 'react-chartjs-2';
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
  if (!config) return null;
  const dataConDatos = {
    ...config.data,
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas Reales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: config.type === 'bar' ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {config.type === 'line' ? (
        <Line data={dataConDatos} options={config.options} />
      ) : (
        <Bar data={dataConDatos} options={config.options} />
      )}
    </div>
  );
};

export default DynamicChart;