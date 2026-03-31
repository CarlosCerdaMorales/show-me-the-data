import React, { useState, useEffect } from 'react';
import { RECOMMENDED_VISUALS } from '../../data/visualizationTheory';
import { UVL_FEATURES } from '../../data/uvlMapping';

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

  const types = csvData?.types || {};

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
    if (selectedRelationship === 'part_to_whole' || selectedRelationship === 'deviation') return isText(col);
    return isText(col); 
  });

  const validYColumns = columns.filter(col => isNumeric(col));

  const availableXColumns = validXColumns.filter(col => col !== mapping.groupBy);

  const availableGroupByColumns = columns.filter(isText).filter(col => 
    col !== mapping.xColumn
  );

  const validX = mapping.xColumn ? validXColumns.includes(mapping.xColumn) : true;
  const validY = mapping.yColumn ? validYColumns.includes(mapping.yColumn) : true;
  const validThreshold = selectedRelationship === 'deviation' ? (mapping.threshold !== '' && !isNaN(mapping.threshold)) : true;
  const isDuplicateGroupBy = mapping.groupBy && mapping.xColumn === mapping.groupBy;

  const disableGenerate = !mapping.xColumn || !mapping.yColumn || !validX || !validY || !validThreshold || isDuplicateGroupBy || loading;

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
        GridLines: true,
        mapping: {
          x: mapping.xColumn,
          y: mapping.yColumn,
          groupBy: mapping.groupBy,
          threshold: mapping.threshold ? parseFloat(mapping.threshold) : null,
          aggregate: aggregation,
          granularity: isDate(mapping.xColumn) ? granularity : null
        }
      }
    };
    onGenerate(request_from_frontend);
  };

  const recommendation = RECOMMENDED_VISUALS[selectedIntent] || null;

  const inputStyle = (isValid) => ({
    width: '100%', padding: '10px 14px', borderRadius: '6px', fontSize: '14px',
    border: isValid === false ? '2px solid #ef4444' : '1px solid #d1d5db',
    outline: 'none', backgroundColor: '#ffffff', color: '#111827', boxSizing: 'border-box'
  });

  const labelStyle = { display: 'block', fontWeight: '500', marginBottom: '6px', color: '#374151', fontSize: '14px' };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#111827', margin: 0, fontSize: '24px', fontWeight: '600' }}>Mapeo de Variables</h2>
        <button onClick={onBack} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          ← Volver a intenciones
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: '1.2' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={labelStyle}>Eje X (Dimensión / Categoría):</label>
              <select value={mapping.xColumn || ''} onChange={(e) => setMapping({...mapping, xColumn: e.target.value})} style={inputStyle(mapping.xColumn ? validX : null)}>
                <option value="">Selecciona columna...</option>
                {availableXColumns.map(col => <option key={col} value={col}>{col} {types[col] ? `— ${types[col]}` : ''}</option>)}
              </select>
            </div>

            {isDate(mapping.xColumn) && (
              <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <label style={labelStyle}>Resolución Temporal:</label>
                <select value={granularity} onChange={(e) => setGranularity(e.target.value)} style={inputStyle(null)}>
                  <option value="day">Día a día</option>
                  <option value="month_year">Mes y Año</option>
                  <option value="year">Año completo</option>
                </select>
              </div>
            )}

            {(selectedRelationship === 'part_to_whole' || selectedIntent === 'deviation_over_time') && (
              <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <label style={labelStyle}>Subcategoría (Agrupar/Comparar):</label>
                <select value={mapping.groupBy || ''} onChange={(e) => setMapping({...mapping, groupBy: e.target.value})} style={inputStyle(null)}>
                  <option value="">Ninguno (Gráfico simple)</option>
                  {availableGroupByColumns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>
            )}

            <div>
              <label style={labelStyle}>Eje Y (Métrica / Valor):</label>
              <select value={mapping.yColumn || ''} onChange={(e) => setMapping({...mapping, yColumn: e.target.value})} style={inputStyle(mapping.yColumn ? validY : null)}>
                <option value="">Selecciona columna...</option>
                {validYColumns.map(col => <option key={col} value={col}>{col} {types[col] ? `— ${types[col]}` : ''}</option>)}
              </select>
            </div>

            {selectedRelationship === 'deviation' && (
              <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <label style={{...labelStyle, color: '#991b1b'}}>Valor de Referencia (Umbral):</label>
                <input 
                  type="number" 
                  value={mapping.threshold || ''}
                  onChange={(e) => setMapping({...mapping, threshold: e.target.value})}
                  placeholder="Ej: 1000"
                  style={inputStyle(mapping.threshold ? validThreshold : null)}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>Operación Matemática:</label>
              <select value={aggregation} onChange={(e) => setAggregation(e.target.value)} style={inputStyle(null)}>
                <option value="sum">Sumar valores</option>
                <option value="mean">Calcular Promedio</option>
                <option value="count">Contar registros</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={disableGenerate}
              style={{
                width: '100%', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', marginTop: '10px',
                backgroundColor: disableGenerate ? '#d1d5db' : '#4f46e5',
                color: 'white', border: 'none', cursor: disableGenerate ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Derivando Gráfico...' : 'Generar Visualización Final'}
            </button>
          </div>
        </div>

        <div style={{ flex: '0.8', padding: '24px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h4 style={{ color: '#374151', margin: '0 0 20px 0', fontSize: '15px', fontWeight: '600', width: '100%', textAlign: 'left' }}>Sugerencia Teórica:</h4>
          {recommendation ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'inline-block', marginBottom: '16px' }}>
                 <img src={recommendation.image} alt="preview" style={{ maxWidth: '140px', display: 'block' }} />
              </div>
              <p style={{ fontWeight: '600', color: '#111827', margin: '0 0 8px 0', fontSize: '15px' }}>{recommendation.label}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>{recommendation.desc}</p>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' }}>Selecciona una intención para ver la recomendación empírica.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepMapping;