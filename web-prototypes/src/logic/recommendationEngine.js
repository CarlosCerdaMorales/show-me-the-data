export const recommendTimeSeries = (data, userIntent) => {
  // Detectar si los intervalos son irregulares
  const isIrregular = checkIrregularIntervals(data);

  // Si los intervalos son irregulares -> Puntos solos
  if (isIrregular) {
    return {
      type: 'SCATTER',
      reason: 'Se han detectado intervalos de tiempo irregulares. Conectar los puntos con una línea sugeriría una continuidad inexistente o engañosa (S. Few).',
      config: { showLine: false, showPoints: true }
    };
  }

  // Si se busca enfatizar valores de manera individual -> Barras verticales
  if (userIntent === 'COMPARE_VALUES') {
    return {
      type: 'BAR',
      reason: 'Para comparar magnitudes individuales discretas, las barras verticales permiten apreciar mejor la diferencia de valores sin distraer con la forma de la tendencia.',
      config: { orientation: 'vertical' }
    };
  }

  // Si se busca enfatizar la tendencia general -> Líneas 
  if (userIntent === 'SHOW_TREND') {
    return {
      type: 'LINE',
      reason: 'Las líneas son la forma más eficaz de percibir patrones, tendencias y tasas de cambio a lo largo del tiempo.',
      config: { 
        tension: 0.1,
        pointRadius: 3
      } 
    };
  }

  // Si no se sabe la intención, se dejan líneas
  return { type: 'LINE', reason: 'Por defecto, la línea es la mejor representación para series temporales continuas.' };
};

// Función para detectar irregularidad en los intervalos
function checkIrregularIntervals(data) {
  return false; 
}