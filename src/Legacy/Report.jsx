import React, { useState, useEffect } from 'react';
import '../CSS/report.css';

const Report = ({ fileName, fileContent, onClose }) => {
    const [reportData, setReportData] = useState(null);
    const [overallScore, setOverallScore] = useState(0);
    const [maxPossibleScore, setMaxPossibleScore] = useState(0); // Added state for max possible score

    useEffect(() => {
        if (fileContent) {
            try {
                const data = JSON.parse(fileContent);
                setReportData(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [fileContent]);

    useEffect(() => {
        if (reportData) {
            // Calculate total score
            const totalScore = reportData.questions.reduce((acc, question) => {
                if (question.answer !== '') {
                    return acc + (question.score || 0);
                }
                return acc;
            }, 0);
    
            // Calculate maximum possible score for answered questions
            const answeredQuestionsCount = reportData.questions.filter(question => question.answer !== '').length;
            const maxPossibleScore = answeredQuestionsCount * 3;
    
            setOverallScore(totalScore);
            setMaxPossibleScore(maxPossibleScore);
        }
    }, [reportData]);
    

    // Function to render score as symbol
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
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-btn" onClick={onClose}>Close</button>
                <h2>{fileName}</h2>
                {reportData && (
                    <div className="report-content">
                        <p>Author: {reportData.author}</p>
                        <ul className="question-list">
                            {reportData.questions.map((question, index) => (
                                question.answer !== '' && (
                                    <li key={index} className="question-item">
                                        <span className="question-text">{index + 1}. {question.text}</span>{' '}
                                        <span className={`score-${question.score || 0}`}>
                                            {renderScore(question.score || 0)}
                                        </span>
                                    </li>
                                )
                            ))}
                        </ul>
                        <p>Total Score: {overallScore} / {maxPossibleScore}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
