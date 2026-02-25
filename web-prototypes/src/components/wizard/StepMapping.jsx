import React, { useState } from 'react';
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

  const validX = mapping.xColumn ? (isDate(mapping.xColumn) || !isNumeric(mapping.xColumn)) : true;
  const validY = mapping.yColumn ? isNumeric(mapping.yColumn) : true;

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
          aggregate: aggregation,
          granularity: isDate(mapping.xColumn) ? granularity : null
        }
      }
    };
    onGenerate(request_from_frontend);
  };

  const recommendation = RECOMMENDED_VISUALS[selectedIntent] || null;

  return (
    <div className="mapping-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'white' }}>3. Mapeo de Variables</h2>
        <button onClick={onBack} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          ← Volver
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Eje X (Dimensión):</label>
              <select 
                value={mapping.xColumn || ''} 
                onChange={(e) => setMapping({...mapping, xColumn: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: mapping.xColumn && !validX ? '2px solid #dc3545' : '1px solid #ccc' }}
              >
                <option value="">Selecciona columna...</option>
                {columns.map(col => <option key={col} value={col}>{col} {types[col] ? `(${types[col]})` : ''}</option>)}
              </select>
            </div>

            {isDate(mapping.xColumn) && (
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f1ff', borderRadius: '8px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#084298' }}>Temporalidad:</label>
                <select value={granularity} onChange={(e) => setGranularity(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                  <option value="day">Día a día</option>
                  <option value="month_year">Mes y Año</option>
                  <option value="year">Año completo</option>
                </select>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Eje Y (Métrica):</label>
              <select 
                value={mapping.yColumn || ''} 
                onChange={(e) => setMapping({...mapping, yColumn: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: mapping.yColumn && !validY ? '2px solid #dc3545' : '1px solid #ccc' }}
              >
                <option value="">Selecciona columna...</option>
                {columns.map(col => <option key={col} value={col}>{col} {types[col] ? `(${types[col]})` : ''}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeeba' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#856404' }}>Operación matemática:</label>
              <select value={aggregation} onChange={(e) => setAggregation(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                <option value="sum">Sumar valores</option>
                <option value="mean">Calcular Promedio</option>
                <option value="count">Contar registros</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!mapping.xColumn || !mapping.yColumn || !validX || !validY || loading}
              style={{
                width: '100%', padding: '15px', borderRadius: '8px', fontWeight: 'bold',
                backgroundColor: (!mapping.xColumn || !mapping.yColumn || !validX || !validY || loading) ? '#ccc' : '#28a745',
                color: 'white', border: 'none', cursor: 'pointer'
              }}
            >
              {loading ? 'Generando...' : 'Generar Visualización Final'}
            </button>
          </div>
        </div>

        <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h4 style={{ color: 'white', marginTop: 0 }}>Recomendación:</h4>
          {recommendation && (
            <div style={{ textAlign: 'center' }}>
              <img src={recommendation.image} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />
              <p style={{ fontWeight: 'bold', color: 'white', marginTop: '10px' }}>{recommendation.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepMapping;