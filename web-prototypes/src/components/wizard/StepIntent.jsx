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
    loading 
}) => {
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
            {Object.values(RELATIONSHIPS_THEORY).map((rel) => (
              <label 
                key={rel.id} 
                className={`intent-card ${selectedRelationship === rel.id ? 'intent-card-selected' : 'intent-card-default'}`}
              >
                <div className="intent-card-header">
                  <input 
                    type="radio" 
                    name="relationship" 
                    value={rel.id} 
                    checked={selectedRelationship === rel.id}
                    onChange={() => onRelationshipChange(rel.id)}
                    className="intent-radio"
                  />
                  <span className={`intent-label-text ${selectedRelationship === rel.id ? 'intent-label-text-selected' : 'intent-label-text-default'}`}>
                    {rel.label}
                  </span>
                </div>
                <p className={`intent-desc ${selectedRelationship === rel.id ? 'intent-desc-selected' : 'intent-desc-default'}`}>
                  {rel.description}
                </p>
              </label>
            ))}
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
              {RELATIONSHIPS_THEORY[selectedRelationship].intents.map((intent) => (
                <label 
                  key={intent.id}
                  className={`intent-subcard ${selectedIntent === intent.id ? 'intent-subcard-selected' : 'intent-subcard-default'}`}
                >
                  <input 
                    type="radio" 
                    name="intent" 
                    value={intent.id}
                    checked={selectedIntent === intent.id}
                    onChange={() => onIntentChange(intent.id)}
                    className="intent-radio"
                  />
                  <span className={`intent-sub-label ${selectedIntent === intent.id ? 'intent-sub-label-selected' : 'intent-sub-label-default'}`}>
                    {intent.label}
                  </span>
                </label>
              ))}
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