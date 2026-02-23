import { useState } from 'react';

const Proto = () => {
  // Estado para guardar los datos que suba el usuario
  const [data, setData] = useState(null);
  
  return (
    <div className="page-container">
      <h2>Prototipo Final: Sistema de Recomendación</h2>
      <p>Sube tu dataset para comenzar el análisis automático.</p>
      
      <div style={{ 
        border: '2px dashed #ccc', 
        padding: '40px', 
        textAlign: 'center', 
        borderRadius: '10px',
        backgroundColor: '#fafafa'
      }}>
        <p style={{ color: '#666' }}>Área de Carga de CSV (Pendiente de implementación)</p>
      </div>
    </div>
  );
};

export default Proto;