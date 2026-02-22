import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VentasChartJS = () => {
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
            
            if (ventasPorMes[mes]) {
              ventasPorMes[mes] += venta;
            } else {
              ventasPorMes[mes] = venta;
            }
          }
        });

        const etiquetas = Object.keys(ventasPorMes).sort();
        const valores = etiquetas.map(mes => ventasPorMes[mes]);

        setChartData({
          labels: etiquetas,
          datasets: [
            {
              label: 'Ventas Totales (Chart.js)',
              data: valores,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
        setLoading(false);
      },
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ventas 2025 (Datos Sincronizados)' },
    },
  };

  if (loading) return <p>Cargando datos...</p>;

  return <Line options={options} data={chartData} />;
};

export default VentasChartJS;