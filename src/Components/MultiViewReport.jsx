import React from 'react';
import '../CSS/multiViewReport.css'; // Make sure to adjust the path if needed

const MultiViewReport = ({ files, onClose }) => {
    const renderScore = (score) => {
        switch (score) {
            case 3:
                return '++';
            case 2:
                return '+';
            case 1:
                return '-';
            case 0:
                return 'X';
            default:
                return '';
        }
    };

    return (
        <div className="multi-view-report-overlay">
            {files.map((file, index) => {
                const { name, content } = file;
                const { questions } = JSON.parse(content);
                return (
                    <div key={index} className="multi-view-report">
                        <button className="close-btn" onClick={onClose}>Close</button>
                        <h2>{name}</h2>
                        <div className="reports-container">
                            {questions.map((question, qIndex) => (
                                <div key={qIndex} className="single-report">
                                    <span className="question-text">{question.text}</span>{' '}
                                    <span className={`score-${question.score || 0}`}>
                                        {renderScore(question.score || 0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MultiViewReport;
