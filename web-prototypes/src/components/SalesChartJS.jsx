import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
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

const SalesChartJS = ({ tipoVista = 'line' }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse('/ventas_tienda_online.csv', {
      download: true,
      header: true,
      delimiter: ";", 
      skipEmptyLines: true, 
      complete: (results) => {
        const data = results.data;
        const ventasPorMes = {};

        data.forEach((row) => {
          if (row.Fecha && row.Ventas_Totales) {
            const ventaString = row.Ventas_Totales.replace(',', '.');
            const venta = parseFloat(ventaString);
            if (isNaN(venta)) return;

            const mes = row.Fecha.substring(0, 7); 
            ventasPorMes[mes] = (ventasPorMes[mes] || 0) + venta;
          }
        });

        const etiquetas = Object.keys(ventasPorMes).sort();
        const valores = etiquetas.map(mes => ventasPorMes[mes]);

        setChartData({
          labels: etiquetas,
          datasets: [
            {
              label: tipoVista === 'line' ? 'Tendencia de Ventas' : 'Comparativa Mensual',
              data: valores,
              borderColor: tipoVista === 'line' ? 'rgb(53, 162, 235)' : 'rgb(255, 99, 132)',
              backgroundColor: tipoVista === 'line' ? 'rgba(53, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
              tension: 0.3,
            },
          ],
        });
        setLoading(false);
      },
    });
  }, [tipoVista]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: tipoVista === 'line' 
          ? 'Análisis de Tendencia (Serie Temporal Continua)' 
          : 'Comparación Discreta (Valores Individuales)' 
      },
    },
  };

  if (loading) return <p>Cargando datos...</p>;

  return tipoVista === 'line' 
    ? <Line options={options} data={chartData} /> 
    : <Bar options={options} data={chartData} />;
};

export default SalesChartJS;