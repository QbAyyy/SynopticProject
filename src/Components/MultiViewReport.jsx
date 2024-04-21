import React from 'react';
import '../CSS/multiViewReport.css'; // Adjust the path if needed

const MultiViewReport = ({ files, onClose }) => {
    const renderScore = (score) => {
        switch (score) {
            case 3:
                return '++';
            case 2:
                return '++';
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
                const reportData = JSON.parse(content);
                return (
                    <div key={index} className="multi-view-report" role="dialog" aria-labelledby={`reportTitle${index}`} aria-modal="true">
                        <button className="close-btn" onClick={() => onClose(index)} aria-label={`Close report ${name}`}>Close</button>
                        <h2 id={`reportTitle${index}`}>{name}</h2>
                        <div className="report-metadata">
                            <p><strong>Author:</strong> <span>{reportData.author}</span></p>
                            <p><strong>Date:</strong> <span>{reportData.dateCreated}</span></p>
                            <p><strong>Time:</strong> <span>{reportData.timeCreated}</span></p>
                        </div>
                        <div className="report-content">
                            {reportData.questions.filter(q => q.answer).map((question, qIndex) => (
                                <div key={qIndex} className="single-report question-item">
                                    <h3 className="question-text">{qIndex + 1}. {question.text}</h3>
                                    <span className={`score score-${question.score}`} aria-hidden="true">
                                        {renderScore(question.score)}
                                    </span>
                                    <p className="principle">Principle: {question.principle}</p>
                                    <p className="answer"><strong>Answer:</strong> {question.answer}</p>
                                    {question.explanation && (
                                        <div className="explanation">{question.explanation}</div>
                                    )}
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
