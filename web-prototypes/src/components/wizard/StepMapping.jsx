import React from 'react';
import { RECOMMENDED_VISUALS, RELATIONSHIPS_THEORY } from '../../data/visualizationTheory';
import { UVL_FEATURES } from '../../data/uvlMapping';

const StepMapping = ({ 
  columns, 
  mapping, 
  setMapping, 
  onGenerate, 
  selectedRelationship, 
  selectedIntent,
  onBack,
  loading 
}) => {

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
          y: mapping.yColumn
        }
      }
    };

    onGenerate(request_from_frontend);
  };

  const recommendation = RECOMMENDED_VISUALS[selectedIntent] || null;

  return (
    <div className="mapping-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>3. Mapeo de Variables</h2>
        <button onClick={onBack} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          ← Cambiar intención
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                Eje X (Categorías / Tiempo):
              </label>
              <select 
                value={mapping.xColumn || ''} 
                onChange={(e) => setMapping({...mapping, xColumn: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="">Selecciona columna...</option>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                Eje Y (Valores Numéricos):
              </label>
              <select 
                value={mapping.yColumn || ''} 
                onChange={(e) => setMapping({...mapping, yColumn: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="">Selecciona columna...</option>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!mapping.xColumn || !mapping.yColumn || loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: (!mapping.xColumn || !mapping.yColumn || loading) ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: (mapping.xColumn && mapping.yColumn && !loading) ? 'pointer' : 'not-allowed',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {loading ? 'Procesando Motor...' : 'Generar Visualización Final'}
            </button>
          </div>
        </div>

        <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h4 style={{ color: 'white', marginTop: 0 }}>Recomendación del Sistema:</h4>
          {recommendation ? (
            <div style={{ textAlign: 'center' }}>
              <img 
                src={recommendation.image} 
                alt={recommendation.label} 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }} 
              />
              <p style={{ fontWeight: 'bold', marginTop: '10px', color: 'white' }}>{recommendation.label}</p>
              <p style={{ fontSize: '0.9em', color: 'white' }}>{recommendation.desc}</p>
            </div>
          ) : (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No hay una pre-visualización disponible para esta selección.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepMapping;