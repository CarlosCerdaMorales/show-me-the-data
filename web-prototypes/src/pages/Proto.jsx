import React, { useState } from 'react';
import axios from 'axios';

import StepUpload from '../components/wizard/StepUpload';
import StepIntent from '../components/wizard/StepIntent';
import StepMapping from '../components/wizard/StepMapping';
import StepResult from '../components/wizard/StepResult';

import './css/Proto.css';

const Proto = () => {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [mapping, setMapping] = useState({ xColumn: '', yColumn: '', groupBy: '', threshold: ''});
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

  const getStepItemClass = (isActive, isPast) => {
    if (isActive) return 'proto-step-item-active';
    if (isPast) return 'proto-step-item-past';
    return 'proto-step-item-future';
  };

  const getStepNumberClass = (isActive, isPast) => {
    if (isActive || isPast) return 'proto-step-number-active';
    return 'proto-step-number-future';
  };

  return (
    <div className="proto-container">
      
      <div className="proto-stepper">
        {[
          { num: 1, label: "Datos" },
          { num: 2, label: "Intención" },
          { num: 3, label: "Variables" },
          { num: 4, label: "Resultado" }
        ].map(item => {
          const isActive = step === item.num;
          const isPast = step >= item.num;
          
          return (
            <div 
              key={item.num} 
              className={`proto-step-item ${getStepItemClass(isActive, isPast)}`}
              onClick={() => isPast && setStep(item.num)}
            >
              <span className={`proto-step-number ${getStepNumberClass(isActive, isPast)}`}>
                {item.num}
              </span>
              {item.label}
              
              {isActive && (
                <div className="proto-step-indicator" />
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
          csvData={csvData}
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