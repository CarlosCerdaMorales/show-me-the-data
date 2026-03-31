import React from 'react';
import './css/StepUpload.css';

const StepUpload = ({ onFileUpload, csvData, onConfirm, loading, error }) => {
  return (
    <div className="upload-container">
      <h2 className="upload-title">Ingesta de Datos</h2>
      
      <div className="upload-dropzone">
        <input 
          type="file" 
          accept=".csv" 
          onChange={onFileUpload} 
          className="upload-input"
        />
        {loading && <div className="upload-message-loading">Analizando documento...</div>}
        {error && <div className="upload-message-error">{error}</div>}
      </div>

      {csvData && (
        <div className="preview-container">
          <div className="preview-header">
            <div>
              <h3 className="preview-title">Vista Previa</h3>
              <p className="preview-subtitle">{csvData.total_rows} filas detectadas</p>
            </div>
            <button 
              onClick={onConfirm}
              className="preview-button"
            >
              Continuar al análisis
            </button>
          </div>
          <div className="table-wrapper">
            <table className="preview-table">
              <thead>
                <tr className="table-thead-tr">
                  {csvData.columns.map((col, index) => {
                    const type = csvData.types[col];
                    let badgeClass = 'type-badge-default';
                    if (type === 'Fecha') badgeClass = 'type-badge-fecha';
                    else if (type === 'Numérico') badgeClass = 'type-badge-numerico';

                    return (
                      <th key={index} className="table-th">
                        <div className="th-content">{col}</div>
                        <span className={`type-badge ${badgeClass}`}>
                          {type}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {csvData.preview.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    {csvData.columns.map((col, j) => (
                      <td key={j} className="table-td">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepUpload;