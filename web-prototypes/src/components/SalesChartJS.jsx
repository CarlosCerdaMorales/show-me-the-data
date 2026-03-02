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
          // Validamos que existan los campos necesarios
          if (row.Fecha && row.Ventas_Totales) {
            
            // 1. Limpieza de valor monetario (coma a punto)
            const ventaString = row.Ventas_Totales.replace(',', '.');
            const venta = parseFloat(ventaString);
            
            if (isNaN(venta)) return;

            // 2. Parseo de Fecha: DD-MM-YYYY -> YYYY-MM
            const partesFecha = row.Fecha.split('-'); // ['10', '03', '2025']
            
            if (partesFecha.length === 3) {
                // Creamos una clave ordenable: "2025-03"
                const keyMes = `${partesFecha[2]}-${partesFecha[1]}`;
                ventasPorMes[keyMes] = (ventasPorMes[keyMes] || 0) + venta;
            }
          }
        });

        // 3. Ordenar las claves (YYYY-MM) para que el gráfico salga cronológico
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