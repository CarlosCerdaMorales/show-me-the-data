import React from 'react';
import { RELATIONSHIPS_THEORY } from '../../data/visualizationTheory';
import './css/StepIntent.css';

const StepIntent = ({ 
  selectedRelationship, 
  selectedIntent, 
  onRelationshipChange, 
  onIntentChange, 
  onGenerate, 
  onBack, 
  loading,
  csvData
}) => {

  const types = csvData?.types || {};
  const hasDateColumn = Object.values(types).some(t => {
    const tLower = (t || '').toLowerCase();
    return tLower.includes('fecha');
  });

  return (
    <div className="intent-container">
      <div className="intent-header">
        <h2 className="intent-title">Define tu Objetivo</h2>
        <button onClick={onBack} className="intent-back-btn">
          ← Volver a los datos
        </button>
      </div>
      
      <div className="intent-layout">
        <div className="intent-col">
          <h3 className="intent-col-title">1. ¿Qué relación quieres mostrar?</h3>
          <div className="intent-radio-group">
            {Object.values(RELATIONSHIPS_THEORY).map((rel) => {
              const isDisabled = !hasDateColumn && rel.id === 'time_series';
              
              return (
                <label 
                  key={rel.id} 
                  className={`intent-card ${selectedRelationship === rel.id ? 'intent-card-selected' : 'intent-card-default'} ${isDisabled ? 'intent-card-disabled' : ''}`}
                  style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                  <div className="intent-card-header">
                    <input 
                      type="radio" 
                      name="relationship" 
                      value={rel.id} 
                      checked={selectedRelationship === rel.id}
                      onChange={() => { if (!isDisabled) onRelationshipChange(rel.id); }}
                      disabled={isDisabled}
                      className="intent-radio"
                      style={isDisabled ? { cursor: 'not-allowed' } : {}}
                    />
                    <span className={`intent-label-text ${selectedRelationship === rel.id ? 'intent-label-text-selected' : 'intent-label-text-default'}`}>
                      {rel.label} {isDisabled && <span style={{fontSize: '0.75em', color: '#dc3545', marginLeft: '6px', fontWeight: 'normal'}}>(Requiere columnas de tipo fecha)</span>}
                    </span>
                  </div>
                  <p className={`intent-desc ${selectedRelationship === rel.id ? 'intent-desc-selected' : 'intent-desc-default'}`}>
                    {rel.description}
                  </p>
                </label>
              );
            })}
          </div>
        </div>

        <div className="intent-col">
          <h3 className="intent-col-title">2. ¿Cuál es tu intención específica?</h3>
          
          {!selectedRelationship ? (
            <div className="intent-empty">
              <p className="intent-empty-text">Selecciona primero un tipo de relación en el panel izquierdo.</p>
            </div>
          ) : (
            <div className="intent-radio-group">
              {RELATIONSHIPS_THEORY[selectedRelationship].intents.map((intent) => {
                const isDisabled = !hasDateColumn && intent.id === 'deviation_over_time';

                return (
                  <label 
                    key={intent.id}
                    className={`intent-subcard ${selectedIntent === intent.id ? 'intent-subcard-selected' : 'intent-subcard-default'} ${isDisabled ? 'intent-subcard-disabled' : ''}`}
                    style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    <input 
                      type="radio" 
                      name="intent" 
                      value={intent.id}
                      checked={selectedIntent === intent.id}
                      onChange={() => { if (!isDisabled) onIntentChange(intent.id); }}
                      disabled={isDisabled}
                      className="intent-radio"
                      style={isDisabled ? { cursor: 'not-allowed' } : {}}
                    />
                    <span className={`intent-sub-label ${selectedIntent === intent.id ? 'intent-sub-label-selected' : 'intent-sub-label-default'}`}>
                      {intent.label} {isDisabled && <span style={{fontSize: '0.8em', color: '#dc3545', marginLeft: '6px'}}>(Requiere Fechas)</span>}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          <div className="intent-footer">
            <button 
              disabled={!selectedIntent || loading}
              onClick={onGenerate}
              className={`intent-btn ${(!selectedIntent || loading) ? 'intent-btn-disabled' : 'intent-btn-active'}`}
            >
              {loading ? 'Procesando modelo...' : 'Continuar al Mapeo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIntent;