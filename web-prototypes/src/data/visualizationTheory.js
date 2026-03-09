// src/data/visualizationTheory.js

import imgBarStandard from '../assets/chart-icons/bar-standard.png';
import imgLineTrend from '../assets/chart-icons/line-trend.png';
import imgScatter from '../assets/chart-icons/scatter.png';
import imgBarStacked from '../assets/chart-icons/bar-stacked.png';
import imgBarDiverging from '../assets/chart-icons/bar-diverging.png';
import imgBoxplot from '../assets/chart-icons/boxplot.png'; 
import imgTableLens from '../assets/chart-icons/table-lens.png';

export const RELATIONSHIPS_THEORY = {
    nominal: {
      id: 'nominal',
      label: 'Comparación Nominal',
      description: 'Comparar tamaños de valores discretos sin orden particular.',
      intents: [
        { id: 'compare_sizes', label: 'Comparar tamaños (Estándar)' }
      ]
    },
    time_series: {
      id: 'time_series',
      label: 'Series Temporales',
      description: 'Valores cuantitativos en una secuencia temporal (Cronológico).',
      intents: [
        { id: 'emphasize_individual', label: 'Enfatizar valores individuales (Barras verticales)' },
        { id: 'show_evolution', label: 'Mostrar la evolución del patrón (Líneas)' },
        { id: 'irregular_intervals', label: 'Intervalos de tiempo irregulares (Puntos)' }
      ]
    },
    ranking: {
      id: 'ranking',
      label: 'Rankings',
      description: 'Relacionar valores por magnitud (de mayor a menor o viceversa).',
      intents: [
        { id: 'emphasize_larger', label: 'Enfatizar valores mayores (Orden Descendente)' },
        { id: 'emphasize_smaller', label: 'Enfatizar valores menores (Orden Ascendente)' },
        { id: 'non_zero_scale', label: 'Escala no arranca en 0 (Puntos)' }
      ]
    },
    part_to_whole: {
      id: 'part_to_whole',
      label: 'Partes de un Todo',
      description: 'Mostrar la proporción que cada parte contribuye al total.',
      intents: [
        { id: 'touching_bars', label: 'Comparar partes individuales (Barras pegadas)' },
        { id: 'stacked_bars', label: 'Ver contribución al total (Barras apiladas)' }
      ]
    },
    deviation: {
      id: 'deviation',
      label: 'Desviaciones',
      description: 'Diferencia respecto a un conjunto de valores de referencia.',
      intents: [
        { id: 'base_difference', label: 'Diferencias respecto a una base (Barras divergentes)' },
        { id: 'deviation_over_time', label: 'Desviación a lo largo del tiempo (Líneas con base)' }
      ]
    },
    distribution: {
      id: 'distribution',
      label: 'Distribuciones',
      description: 'Muestra cómo los valores cuantitativos se distribuyen a lo largo de su rango.',
      intents: [
        { id: 'dist_simple_count', label: 'Simple: Enfatizar cantidad por intervalo (Histograma)' },
        { id: 'dist_simple_shape', label: 'Simple: Enfatizar forma de la distribución (Polígono)' },
        { id: 'dist_simple_points', label: 'Simple: Mostrar cada valor (Gráfico de bandas)' },
        { id: 'dist_multiple_shape', label: 'Múltiple: Comparar formas (Líneas)' },
        { id: 'dist_multiple_boxes', label: 'Múltiple: Comparar estadísticas clave (Cajas y Bigotes)' },
        { id: 'dist_multiple_points', label: 'Múltiple: Comparar valores individuales (Bandas Múltiples)' }
      ]
    },
    correlation: {
      id: 'correlation',
      label: 'Correlación',
      description: 'Relación entre dos conjuntos de valores (dirección y fuerza).',
      intents: [
        { id: 'corr_standard', label: 'Relación estándar entre variables (Gráfico de dispersión)' },
        { id: 'corr_table_lens', label: 'Comparación paralela (Table Lens / Barras)' }
      ]
    }
  };

export const RECOMMENDED_VISUALS = {
  // Nominal
  'compare_sizes': { 
    type: 'bar', 
    label: 'Gráfico de Barras', 
    image: imgBarStandard,
    desc: 'Ideal para comparar magnitudes discretas.' 
  },
  
  // Series Temporales
  'show_evolution': { 
    type: 'line', 
    label: 'Gráfico de Línea', 
    image: imgLineTrend,
    desc: 'Perfecto para ver tendencias continuas en el tiempo.' 
  },
  'emphasize_individual': { 
    type: 'bar', 
    label: 'Gráfico de Barras', 
    image: imgBarStandard, 
    desc: 'Enfatiza los valores individuales por fecha.' 
  },
  'irregular_intervals': { 
    type: 'scatter', 
    label: 'Diagrama de Dispersión', 
    image: imgScatter,
    desc: 'Muestra puntos en momentos desiguales.' 
  },

  // Ranking
  'emphasize_larger': { 
    type: 'bar', 
    label: 'Barras Ordenadas', 
    image: imgBarStandard, 
    desc: 'Destaca los valores más altos.' 
  },
  'emphasize_smaller': { 
    type: 'bar', 
    label: 'Barras Ordenadas', 
    image: imgBarStandard, 
    desc: 'Destaca los valores más bajos.' 
  },
  'non_zero_scale': { 
    type: 'scatter', 
    label: 'Dot Plot', 
    image: imgScatter, 
    desc: 'Enfoca en las diferencias relativas lejos del cero.' 
  },

  // Partes de un todo
  'touching_bars': { 
    type: 'bar', 
    label: 'Barras Agrupadas', 
    image: imgBarStacked,
    desc: 'Compara subcategorías lado a lado.' 
  },
  'stacked_bars': { 
    type: 'bar', 
    label: 'Barras Apiladas', 
    image: imgBarStacked,
    desc: 'Muestra la contribución al total.' 
  },

  // Desviación
  'base_difference': { 
    type: 'bar', 
    label: 'Barras Divergentes', 
    image: imgBarDiverging,
    desc: 'Muestra valores positivos y negativos.' 
  },
  'deviation_over_time': { 
    type: 'line', 
    label: 'Línea de Desviación', 
    image: imgLineTrend,
    desc: 'Muestra cambios respecto a una base temporal.' 
  },

  // Distribuciones
  'dist_simple_count': { 
    type: 'bar', 
    label: 'Histograma', 
    image: imgBarStandard,
    desc: 'Barras que enfatizan el número de ocurrencias por intervalo.' 
  },
  'dist_simple_shape': { 
    type: 'line', 
    label: 'Polígono de Frecuencias', 
    image: imgLineTrend,
    desc: 'Línea que llama la atención sobre la forma total de la distribución.' 
  },
  'dist_simple_points': { 
    type: 'scatter', 
    label: 'Gráfico de Bandas', 
    image: imgScatter,
    desc: 'Muestra la posición exacta de cada valor individual.' 
  },
  'dist_multiple_shape': { 
    type: 'line', 
    label: 'Polígonos Múltiples', 
    image: imgLineTrend,
    desc: 'Varias líneas para comparar la forma de múltiples conjuntos.' 
  },
  'dist_multiple_boxes': { 
    type: 'boxplot', 
    label: 'Gráfico de Cajas y Bigotes', 
    image: imgBoxplot,
    desc: 'Compara distribuciones usando medianas, rangos y percentiles.' 
  },
  'dist_multiple_points': { 
    type: 'scatter', 
    label: 'Bandas Múltiples', 
    image: imgScatter,
    desc: 'Filas/columnas de puntos para comparar conjuntos pequeños.' 
  },

  // Correlación
  'corr_standard': { 
    type: 'scatter', 
    label: 'Gráfico de Dispersión', 
    image: imgScatter,
    desc: 'Relaciona dos variables cuantitativas para ver su fuerza y dirección.' 
  },
  'corr_table_lens': { 
    type: 'bar', 
    label: 'Table Lens', 
    image: imgTableLens,
    desc: 'Dos gráficos de barras en paralelo para comparar variables.' 
  }
};