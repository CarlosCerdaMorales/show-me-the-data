import React, { useState } from 'react';
import axios from 'axios';

import StepUpload from '../components/wizard/StepUpload';
import StepIntent from '../components/wizard/StepIntent';
import StepMapping from '../components/wizard/StepMapping';
import StepResult from '../components/wizard/StepResult';

const Proto = () => {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [mapping, setMapping] = useState({ xColumn: '', yColumn: '', groupBy: '', threshold: '', bins: 10, selectedGroups: [] });
  const [chartConfig, setChartConfig] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCsvData(response.data);
    } catch (err) {
      setError("Error al procesar el archivo. ¿Está corriendo el backend?");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateChart = async (payload) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-chart', payload);
      setChartConfig(response.data);
      setStep(4); 
    } catch (error) {
      console.error(error);
      alert("Error conectando con el motor UVL o generando la gráfica");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid #e5e7eb', 
        paddingBottom: '16px', 
        marginBottom: '32px',
        gap: '32px'
      }}>
        {[
          { num: 1, label: "Datos" },
          { num: 2, label: "Intención" },
          { num: 3, label: "Variables" },
          { num: 4, label: "Resultado" }
        ].map(item => {
          const isActive = step === item.num;
          const isPast = step >= item.num;
          
          return (
            <div key={item.num} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: isActive ? '#4f46e5' : (isPast ? '#111827' : '#9ca3af'), 
              fontWeight: isPast ? '600' : '500',
              fontSize: '15px',
              position: 'relative',
              cursor: isPast ? 'pointer' : 'default',
              transition: 'color 0.2s ease'
            }}
            onClick={() => isPast && setStep(item.num)}
            >
              <span style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '24px', 
                height: '24px', 
                borderRadius: '50%',
                backgroundColor: isActive ? '#4f46e5' : (isPast ? '#4f46e5' : '#f3f4f6'),
                color: isPast ? '#ffffff' : '#9ca3af',
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}>
                {item.num}
              </span>
              {item.label}
              
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-18px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#4f46e5',
                  borderRadius: '2px'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <StepUpload 
          onFileUpload={handleFileUpload}
          csvData={csvData}
          onConfirm={() => setStep(2)}
          loading={loading}
          error={error}
        />
      )}

      {step === 2 && (
        <StepIntent 
          selectedRelationship={selectedRelationship}
          selectedIntent={selectedIntent}
          onRelationshipChange={(val) => { setSelectedRelationship(val); setSelectedIntent(null); }}
          onIntentChange={setSelectedIntent}
          onGenerate={() => setStep(3)} 
          onBack={() => setStep(1)}
          loading={loading}
        />
      )}

      {step === 3 && (
        <StepMapping 
          csvData={csvData}
          columns={csvData?.columns || []}
          mapping={mapping}
          setMapping={setMapping}
          onGenerate={handleGenerateChart}
          selectedRelationship={selectedRelationship}
          selectedIntent={selectedIntent}
          onBack={() => setStep(2)}
          loading={loading}
        />
      )}

      {step === 4 && (
        <StepResult 
          chartConfig={chartConfig}
          onBack={() => setStep(3)}
        />
      )}

    </div>
  );
};

export default Proto;