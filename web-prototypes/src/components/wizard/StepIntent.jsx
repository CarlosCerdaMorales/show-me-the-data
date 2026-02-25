import React from 'react';
import { RELATIONSHIPS_THEORY } from '../../data/visualizationTheory';

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Define tu Objetivo</h2>
        <button onClick={onBack} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          ← Volver a los datos
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>1. ¿Qué relación quieres mostrar?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.values(RELATIONSHIPS_THEORY).map((rel) => (
              <label 
                key={rel.id} 
                style={{ 
                  padding: '15px', 
                  border: selectedRelationship === rel.id ? '2px solid #007bff' : '1px solid #ddd', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  backgroundColor: selectedRelationship === rel.id ? '#e7f1ff' : 'white',
                  transition: 'all 0.2s',
                  color: selectedRelationship === rel.id ? '#007bff' : '#333'
                }}
              >
                <input 
                  type="radio" 
                  name="relationship" 
                  value={rel.id} 
                  checked={selectedRelationship === rel.id}
                  onChange={() => onRelationshipChange(rel.id)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontWeight: 'bold' }}>{rel.label}</span>
                <p style={{ margin: '5px 0 0 25px', fontSize: '0.9em', color: '#666' }}>{rel.description}</p>
              </label>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>2. ¿Cuál es tu intención específica?</h3>
          
          {!selectedRelationship ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>Selecciona primero un tipo de relación.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {RELATIONSHIPS_THEORY[selectedRelationship].intents.map((intent) => (
                <label 
                  key={intent.id}
                  style={{ 
                    padding: '15px', 
                    border: selectedIntent === intent.id ? '2px solid #28a745' : '1px solid #ddd', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    backgroundColor: selectedIntent === intent.id ? '#e8f5e9' : 'white',
                    color: selectedIntent === intent.id ? '#28a745' : '#333',
                  }}
                >
                  <input 
                    type="radio" 
                    name="intent" 
                    value={intent.id}
                    checked={selectedIntent === intent.id}
                    onChange={() => onIntentChange(intent.id)}
                    style={{ marginRight: '10px' }}
                  />
                  {intent.label}
                </label>
              ))}
            </div>
          )}

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button 
              disabled={!selectedIntent || loading}
              onClick={onGenerate}
              style={{ 
                backgroundColor: (!selectedIntent || loading) ? '#ccc' : '#007bff', 
                color: 'white', 
                padding: '15px 30px', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '16px', 
                cursor: (!selectedIntent || loading) ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'El Motor está pensando...' : 'Generar Visualización'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIntent;