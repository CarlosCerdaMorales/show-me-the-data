import React, { useState, useEffect } from 'react';
import { RECOMMENDED_VISUALS } from '../../data/visualizationTheory';
import { UVL_FEATURES } from '../../data/uvlMapping';
import './css/StepMapping.css';

const StepMapping = ({ 
  columns, 
  csvData, 
  mapping, 
  setMapping, 
  onGenerate, 
  selectedRelationship, 
  selectedIntent,
  onBack,
  loading 
}) => {
  const [granularity, setGranularity] = useState('month_year');
  const [aggregation, setAggregation] = useState('sum');
  
  const [bins, setBins] = useState('5');
  const [gridLines, setGridLines] = useState(true);

  const [xAlias, setXAlias] = useState('');
  const [yAlias, setYAlias] = useState('');
  const [xUnit, setXUnit] = useState('');
  const [yUnit, setYUnit] = useState('');

  const [groupByBins, setGroupByBins] = useState('5');
  const [groupByAlias, setGroupByAlias] = useState('');
  const [groupByUnit, setGroupByUnit] = useState('');

  const types = csvData?.types || {};
  const uniqueCounts = csvData?.unique_counts || {};

  const isCount = aggregation === 'count';

  const isNumeric = (col) => {
    const t = (types[col] || '').toLowerCase();
    return t.includes('int') || t.includes('float') || t.includes('num') || t.includes('double');
  };

  const isDate = (col) => {
    const t = (types[col] || '').toLowerCase();
    return t.includes('fech') || t.includes('date') || t.includes('time');
  };

  const isText = (col) => {
    return !isNumeric(col) && !isDate(col);
  };

  const validXColumns = columns.filter(col => {
    if (selectedRelationship === 'time_series' || selectedIntent === 'deviation_over_time') return isDate(col);
    return isText(col) || isNumeric(col); 
  });

  const validYColumns = columns.filter(col => isNumeric(col) && col !== mapping.xColumn);

  const availableXColumns = validXColumns.filter(col => col !== mapping.groupBy);

  const availableGroupByColumns = columns.filter(col => isText(col) || isNumeric(col)).filter(col => 
    col !== mapping.xColumn
  );

  const needsBinning = mapping.xColumn && isNumeric(mapping.xColumn) && uniqueCounts[mapping.xColumn] >= 16;
  const needsGroupByBinning = mapping.groupBy && isNumeric(mapping.groupBy) && uniqueCounts[mapping.groupBy] >= 16;

  const validX = mapping.xColumn ? validXColumns.includes(mapping.xColumn) : true;
  const validY = mapping.yColumn ? validYColumns.includes(mapping.yColumn) : true;
  const validThreshold = selectedRelationship === 'deviation' ? (mapping.threshold !== '' && !isNaN(mapping.threshold)) : true;
  const isDuplicateGroupBy = mapping.groupBy && mapping.xColumn === mapping.groupBy;

  const disableGenerate = !mapping.xColumn || (!isCount && !mapping.yColumn) || !validX || (!isCount && !validY) || !validThreshold || isDuplicateGroupBy || (needsBinning && !bins) || (needsGroupByBinning && !groupByBins) || loading;

  useEffect(() => {
    setXAlias('');
    setXUnit('');
  }, [mapping.xColumn]);

  useEffect(() => {
    setYAlias('');
    setYUnit('');
  }, [mapping.yColumn]);

  useEffect(() => {
    setGroupByAlias('');
    setGroupByUnit('');
  }, [mapping.groupBy]);

  useEffect(() => {
    if (mapping.xColumn && !validXColumns.includes(mapping.xColumn)) {
        setMapping(prev => ({ ...prev, xColumn: '' }));
    }
    if (mapping.yColumn && !validYColumns.includes(mapping.yColumn)) {
        setMapping(prev => ({ ...prev, yColumn: '' }));
    }
    
    const usesGroupBy = selectedRelationship === 'part_to_whole' || selectedIntent === 'deviation_over_time';
    if (mapping.groupBy && !usesGroupBy) {
        setMapping(prev => ({ ...prev, groupBy: '' }));
    }
  }, [selectedRelationship, columns, types, selectedIntent]);

  const handleGenerate = () => {
    const request_from_frontend = {
      file: "visualization.uvl",
      config: {
        Nominal: selectedRelationship === 'nominal',
        TimeSeries: selectedRelationship === 'time_series',
        Ranking: selectedRelationship === 'ranking',
        PartToWhole: selectedRelationship === 'part_to_whole',
        Deviation: selectedRelationship === 'deviation',
        [UVL_FEATURES[selectedIntent]]: true,
        GridLines: gridLines,
        mapping: {
          x: mapping.xColumn,
          y: isCount ? (mapping.yColumn || mapping.xColumn) : mapping.yColumn,
          groupBy: mapping.groupBy,
          threshold: mapping.threshold ? parseFloat(mapping.threshold) : null,
          aggregate: aggregation,
          granularity: isDate(mapping.xColumn) ? granularity : null,
          bins: needsBinning ? parseInt(bins) : null,
          xAlias: xAlias.trim() || null,
          yAlias: yAlias.trim() || null,
          xUnit: xUnit.trim() || null,
          yUnit: yUnit.trim() || null,
          
          groupByBins: needsGroupByBinning ? parseInt(groupByBins) : null,
          groupByAlias: groupByAlias.trim() || null,
          groupByUnit: groupByUnit.trim() || null
        }
      }
    };
    onGenerate(request_from_frontend);
  };

  const recommendation = RECOMMENDED_VISUALS[selectedIntent] || null;

  const getInputClass = (isValid) => {
    return `mapping-input ${isValid === false ? 'mapping-input-error' : 'mapping-input-default'}`;
  };

  return (
    <div className="mapping-container">
      <div className="mapping-header">
        <h2 className="mapping-title">Mapeo de Variables</h2>
        <button onClick={onBack} className="mapping-back-btn">
          ← Volver a intenciones
        </button>
      </div>

      <div className="mapping-layout">
        <div className="mapping-left">
          
          <div>
            <label className="mapping-label">Eje X (Dimensión / Categoría):</label>
            <select value={mapping.xColumn || ''} onChange={(e) => setMapping({...mapping, xColumn: e.target.value})} className={getInputClass(mapping.xColumn ? validX : null)}>
              <option value="">Selecciona columna...</option>
              {availableXColumns.map(col => <option key={col} value={col}>{col} {types[col] ? `— ${types[col]}` : ''}</option>)}
            </select>
          </div>

          {mapping.xColumn && (
            <div className="mapping-box-inline" style={{ display: 'flex', gap: '10px', marginTop: '8px', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder={`Alias para "${mapping.xColumn}"`} 
                value={xAlias} 
                onChange={(e) => setXAlias(e.target.value)} 
                className={getInputClass(null)} 
                style={{ flex: 1, padding: '6px' }}
              />
              {isNumeric(mapping.xColumn) && (
                <input 
                  type="text" 
                  placeholder="Unidad (ej. km)" 
                  value={xUnit} 
                  onChange={(e) => setXUnit(e.target.value)} 
                  className={getInputClass(null)} 
                  style={{ width: '120px', padding: '6px' }}
                />
              )}
            </div>
          )}

          {needsBinning && (
            <div className="mapping-box-alert">
              <label className="mapping-label-alert">La variable tiene muchos valores. Agrupar en intervalos:</label>
              <select value={bins} onChange={(e) => setBins(e.target.value)} className={getInputClass(bins ? true : false)}>
                <option value="2">2 intervalos</option>
                <option value="3">3 intervalos</option>
                <option value="4">4 intervalos</option>
                <option value="5">5 intervalos</option>
                <option value="6">6 intervalos</option>
                <option value="7">7 intervalos</option>
                <option value="8">8 intervalos</option>
              </select>
            </div>
          )}

          {isDate(mapping.xColumn) && (
            <div className="mapping-box">
              <label className="mapping-label">Resolución Temporal:</label>
              <select value={granularity} onChange={(e) => setGranularity(e.target.value)} className={getInputClass(null)}>
                <option value="day">Día a día</option>
                <option value="month_year">Mes y Año</option>
                <option value="year">Año completo</option>
              </select>
            </div>
          )}

          {(selectedRelationship === 'part_to_whole' || selectedIntent === 'deviation_over_time') && (
            <div className="mapping-box">
              <label className="mapping-label">Subcategoría (Agrupar/Comparar):</label>
              <select value={mapping.groupBy || ''} onChange={(e) => setMapping({...mapping, groupBy: e.target.value})} className={getInputClass(null)}>
                <option value="">Ninguno (Gráfico simple)</option>
                {availableGroupByColumns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>

              {mapping.groupBy && (
                <div className="mapping-box-inline" style={{ display: 'flex', gap: '10px', marginTop: '8px', marginBottom: '8px' }}>
                  <input 
                    type="text" 
                    placeholder={`Alias para "${mapping.groupBy}"`} 
                    value={groupByAlias} 
                    onChange={(e) => setGroupByAlias(e.target.value)} 
                    className={getInputClass(null)} 
                    style={{ flex: 1, padding: '6px' }}
                  />
                  {isNumeric(mapping.groupBy) && (
                    <input 
                      type="text" 
                      placeholder="Unidad" 
                      value={groupByUnit} 
                      onChange={(e) => setGroupByUnit(e.target.value)} 
                      className={getInputClass(null)} 
                      style={{ width: '120px', padding: '6px' }}
                    />
                  )}
                </div>
              )}

              {needsGroupByBinning && (
                <div className="mapping-box-alert" style={{ marginTop: '8px' }}>
                  <label className="mapping-label-alert">La subcategoría tiene muchos valores. Agrupar en intervalos:</label>
                  <select value={groupByBins} onChange={(e) => setGroupByBins(e.target.value)} className={getInputClass(groupByBins ? true : false)}>
                    <option value="2">2 intervalos</option>
                    <option value="3">3 intervalos</option>
                    <option value="4">4 intervalos</option>
                    <option value="5">5 intervalos</option>
                    <option value="6">6 intervalos</option>
                    <option value="7">7 intervalos</option>
                    <option value="8">8 intervalos</option>
                  </select>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="mapping-label">Operación Matemática:</label>
            <select value={aggregation} onChange={(e) => setAggregation(e.target.value)} className={getInputClass(null)}>
              <option value="sum">Suma</option>
              <option value="mean">Promedio</option>
              <option value="count">Conteo</option>
            </select>
          </div>

          <div>
            <label className="mapping-label">Eje Y (Métrica / Valor):</label>
            <select 
              value={isCount ? '' : (mapping.yColumn || '')} 
              onChange={(e) => setMapping({...mapping, yColumn: e.target.value})} 
              className={getInputClass(isCount ? true : (mapping.yColumn ? validY : null))}
              disabled={isCount}
            >
              {isCount ? (
                <option value="">-- No requerido (Conteo de registros) --</option>
              ) : (
                <>
                  <option value="">Selecciona columna...</option>
                  {validYColumns.map(col => <option key={col} value={col}>{col} {types[col] ? `— ${types[col]}` : ''}</option>)}
                </>
              )}
            </select>
          </div>

          {mapping.yColumn && !isCount && (
            <div className="mapping-box-inline" style={{ display: 'flex', gap: '10px', marginTop: '8px', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder={`Alias para "${mapping.yColumn}"`} 
                value={yAlias} 
                onChange={(e) => setYAlias(e.target.value)} 
                className={getInputClass(null)} 
                style={{ flex: 1, padding: '6px' }}
              />
              {isNumeric(mapping.yColumn) && (
                <input 
                  type="text" 
                  placeholder="Unidad (ej. $)" 
                  value={yUnit} 
                  onChange={(e) => setYUnit(e.target.value)} 
                  className={getInputClass(null)} 
                  style={{ width: '120px', padding: '6px' }}
                />
              )}
            </div>
          )}

          {selectedRelationship === 'deviation' && (
            <div className="mapping-box-alert">
              <label className="mapping-label-alert">Valor de Referencia (Umbral):</label>
              <input 
                type="number" 
                value={mapping.threshold || ''}
                onChange={(e) => setMapping({...mapping, threshold: e.target.value})}
                placeholder="Ej: 1000"
                className={getInputClass(mapping.threshold ? validThreshold : null)}
              />
            </div>
          )}

          <div className="mapping-box">
             <label className="mapping-label" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <input type="checkbox" checked={gridLines} onChange={(e) => setGridLines(e.target.checked)} />
               Mostrar líneas de cuadrícula
             </label>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={disableGenerate}
            className={`mapping-btn ${disableGenerate ? 'mapping-btn-disabled' : 'mapping-btn-active'}`}
          >
            {loading ? 'Derivando Gráfico...' : 'Generar Visualización Final'}
          </button>
        </div>

        <div className="mapping-right">
          <h4 className="mapping-sug-title">Sugerencia Teórica:</h4>
          {recommendation ? (
            <div className="mapping-sug-wrapper">
              <div className="mapping-sug-img-box">
                 <img src={recommendation.image} alt="preview" className="mapping-sug-img" />
              </div>
              <p className="mapping-sug-label">{recommendation.label}</p>
              <p className="mapping-sug-desc">{recommendation.desc}</p>
            </div>
          ) : (
            <p className="mapping-sug-empty">Selecciona una intención para ver la recomendación empírica.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepMapping;