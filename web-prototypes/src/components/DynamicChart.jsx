import React, { useMemo } from 'react';
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

  const chartOptions = useMemo(() => {
    const options = { ...config.options };
    
    const isTargetChartType = ['bar', 'scatter', 'line'].includes(config.type);
    const hasSingleDataset = config.data?.datasets?.length === 1;
    const hasMultipleColors = hasSingleDataset && Array.isArray(config.data.datasets[0].backgroundColor);

    if (isTargetChartType && hasMultipleColors) {
      options.plugins = {
        ...options.plugins,
        legend: {
          ...options.plugins?.legend,
          display: true,
          labels: {
            ...options.plugins?.legend?.labels,
            generateLabels: (chart) => {
              const data = chart.data;
              const dataset = data.datasets[0];
              if (!dataset.data.length) return [];

              return dataset.data.map((dataItem, i) => {
                const labelText = data.labels?.[i] || (dataItem && typeof dataItem === 'object' ? dataItem.x : null) || `Ítem ${i + 1}`;
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                
                const value = dataItem && typeof dataItem === 'object' ? dataItem.y : dataItem;
                const isHidden = isNaN(value) || value === null || meta.data[i].hidden;

                return {
                  text: labelText,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth || 1,
                  hidden: isHidden,
                  index: i
                };
              });
            }
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.index;
            const chart = legend.chart;
            const meta = chart.getDatasetMeta(0);
            if (meta.data[index]) {
              meta.data[index].hidden = !meta.data[index].hidden;
              chart.update();
            }
          }
        }
      };
    }
    return options;
  }, [config]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Chart
        type={config.type} 
        data={config.data}
        options={chartOptions}
      />
    </div>
  );
};

export default DynamicChart;