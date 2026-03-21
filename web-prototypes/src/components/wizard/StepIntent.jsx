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
    <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#111827', margin: 0, fontSize: '24px', fontWeight: '600' }}>Define tu Objetivo</h2>
        <button onClick={onBack} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          ← Volver a los datos
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#374151', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>1. ¿Qué relación quieres mostrar?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.values(RELATIONSHIPS_THEORY).map((rel) => (
              <label 
                key={rel.id} 
                style={{ 
                  padding: '16px', 
                  border: selectedRelationship === rel.id ? '2px solid #4f46e5' : '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  backgroundColor: selectedRelationship === rel.id ? '#eef2ff' : '#ffffff',
                  transition: 'all 0.2s ease',
                  display: 'block'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="radio" 
                    name="relationship" 
                    value={rel.id} 
                    checked={selectedRelationship === rel.id}
                    onChange={() => onRelationshipChange(rel.id)}
                    style={{ marginRight: '12px', accentColor: '#4f46e5' }}
                  />
                  <span style={{ fontWeight: '600', color: selectedRelationship === rel.id ? '#312e81' : '#111827' }}>{rel.label}</span>
                </div>
                <p style={{ margin: '8px 0 0 26px', fontSize: '13px', color: selectedRelationship === rel.id ? '#4338ca' : '#6b7280', lineHeight: '1.4' }}>{rel.description}</p>
              </label>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ color: '#374151', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>2. ¿Cuál es tu intención específica?</h3>
          
          {!selectedRelationship ? (
            <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Selecciona primero un tipo de relación en el panel izquierdo.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {RELATIONSHIPS_THEORY[selectedRelationship].intents.map((intent) => (
                <label 
                  key={intent.id}
                  style={{ 
                    padding: '16px', 
                    border: selectedIntent === intent.id ? '2px solid #4f46e5' : '1px solid #e5e7eb', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    backgroundColor: selectedIntent === intent.id ? '#eef2ff' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input 
                    type="radio" 
                    name="intent" 
                    value={intent.id}
                    checked={selectedIntent === intent.id}
                    onChange={() => onIntentChange(intent.id)}
                    style={{ marginRight: '12px', accentColor: '#4f46e5' }}
                  />
                  <span style={{ fontWeight: '500', color: selectedIntent === intent.id ? '#312e81' : '#374151' }}>{intent.label}</span>
                </label>
              ))}
            </div>
          )}

          <div style={{ marginTop: '40px', textAlign: 'right' }}>
            <button 
              disabled={!selectedIntent || loading}
              onClick={onGenerate}
              style={{ 
                backgroundColor: (!selectedIntent || loading) ? '#d1d5db' : '#4f46e5', 
                color: 'white', 
                padding: '12px 24px', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '15px', 
                fontWeight: '500',
                cursor: (!selectedIntent || loading) ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                width: '100%'
              }}
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