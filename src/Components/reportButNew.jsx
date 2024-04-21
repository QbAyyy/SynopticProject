import React, { useState, useEffect } from 'react';
import '../CSS/diffReport.css';

const Report = ({ fileName, fileContent, onClose }) => {
    const [reportData, setReportData] = useState(null);
    const [overallScore, setOverallScore] = useState(0);
    const [maxPossibleScore, setMaxPossibleScore] = useState(0);
    const [overallRating, setOverallRating] = useState('');

    useEffect(() => {
        if (fileContent) {
            try {
                const data = JSON.parse(fileContent);
                setReportData(data);
                // Since we only consider answered questions, max possible score calculation is handled in the useEffect below
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [fileContent]);

    useEffect(() => {
        if (reportData) {
            // Calculate total score and max possible score for answered questions
            const totalScore = reportData.questions.reduce((acc, question) => question.answer ? acc + question.score : acc, 0);
            const maxScore = reportData.questions.filter(question => question.answer).length * 3;
            setOverallScore(totalScore);
            setMaxPossibleScore(maxScore);

            // Now calculate the overall rating
            const questionsAnswered = reportData.questions.filter(q => q.answer).length;
            if (questionsAnswered > 0) {
                const averageScore = overallScore / questionsAnswered;
                const roundedScore = Math.round(averageScore);
                setOverallRating(renderScore(roundedScore));
            }
        }
    }, [reportData]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

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
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="reportTitle" tabIndex="-1">
            <div className="modal" role="document">
                <button className="close-btn" onClick={onClose} aria-label="Close report">Close</button>
                <h2 id="reportTitle">{reportData?.name || fileName}</h2>
                <div className="report-metadata">
                    <p><strong>Author:</strong> <span>{reportData?.author}</span></p>
                    <p><strong>Date:</strong> <span>{reportData?.dateCreated}</span></p>
                    <p><strong>Time:</strong> <span>{reportData?.timeCreated}</span></p>
                </div>
                {reportData && (
                    <div className="report-content">
                        {reportData.questions.filter(q => q.answer).map((question, index) => (
                            <div className="report-section" key={index} aria-labelledby={`questionTitle${index}`}>
                                <h3 id={`questionTitle${index}`} className="question-text">
                                    Q{index + 1}: {question.text}
                                </h3>
                                <span className={`score score-${question.score}`} aria-hidden="true">
                                    {renderScore(question.score)}
                                </span>
                                <p className="principle">{question.principle}</p>
                                {question.answer && (
                                    <>
                                        <p className="answer"><strong>Answer:</strong> {question.answer}</p>
                                        {question.explanation && (
                                            <p className="explanation">{question.explanation}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                        <div className="report-footer">
                            <p>Total Score: {overallScore} / {maxPossibleScore}</p>
                            <p>
                                Overall Score:
                                <p className={`score score-${(Math.round((overallScore / maxPossibleScore) * 3))}`}> {renderScore(Math.round((overallScore / maxPossibleScore) * 3))}</p>
                            </p>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
