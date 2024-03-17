import React from 'react';
import '../CSS/report.css'; 

const Report = ({ fileName, fileContent, onClose }) => {
  return (
    <div className="modal-overlay" >
      <div className="modal">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{fileName}</h2>
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
};

export default Report;
