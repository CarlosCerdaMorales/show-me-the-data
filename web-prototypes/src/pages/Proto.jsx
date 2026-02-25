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
  const [mapping, setMapping] = useState({ xColumn: '', yColumn: '' });
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
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd', paddingBottom: '20px', marginBottom: '30px' }}>
        {[1, 2, 3, 4].map(num => (
            <div key={num} style={{ marginRight: '20px', color: step === num ? '#007bff' : '#ccc', fontWeight: step === num ? 'bold' : 'normal' }}>
                {num === 1 && "1. Datos"}
                {num === 2 && "2. Intención"}
                {num === 3 && "3. Variables"}
                {num === 4 && "4. Resultado"}
            </div>
        ))}
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
            columns={csvData?.columns || []}
          mapping={mapping}
          setMapping={setMapping}
          onGenerate={handleGenerateChart}
          onBack={() => setStep(2)}
          selectedRelationship={selectedRelationship}
          selectedIntent={selectedIntent}
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