// src/data/visualizationTheory.js

import imgBarStandard from '../assets/chart-icons/bar-standard.png';
import imgLineTrend from '../assets/chart-icons/line-trend.png';
import imgScatter from '../assets/chart-icons/scatter.png';
import imgBarStacked from '../assets/chart-icons/bar-stacked.png';
import imgBarDiverging from '../assets/chart-icons/bar-diverging.png';

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
};