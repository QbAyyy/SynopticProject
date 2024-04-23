import React, { useState, useEffect } from 'react';
import '../CSS/report.css';

const Report = ({ fileName, fileContent, onClose, colorBlindMode }) => {
    const [reportData, setReportData] = useState(null);
    const [overallScore, setOverallScore] = useState(0);
    const [maxPossibleScore, setMaxPossibleScore] = useState(0);
    const [overallRating, setOverallRating] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);

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
            const totalScore = reportData.questions.reduce((acc, question) => question.answer ? acc + question.score : acc, 0);
            const maxScore = reportData.questions.filter(question => question.answer).length * 3;
            setOverallScore(totalScore);
            setMaxPossibleScore(maxScore);

            const questionsAnswered = reportData.questions.filter(q => q.answer).length;
            if (questionsAnswered > 0) {
                const averageScore = overallScore / questionsAnswered;
                const roundedScore = Math.round(averageScore);
                setOverallRating(renderScore(roundedScore));
            }
        }
    }, [reportData, overallScore]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            } else if (event.key === 'ArrowDown') {
                setFocusedIndex(prevIndex => Math.min(prevIndex + 1, reportData?.questions.length - 1));
            } else if (event.key === 'ArrowUp') {
                setFocusedIndex(prevIndex => Math.max(prevIndex - 1, -1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, reportData]);

    const handleQuestionClick = (index) => {
        setFocusedIndex(index);
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
        <div className={`modal-overlay ${colorBlindMode}`} role="dialog" aria-modal="true" aria-labelledby="reportTitle" tabIndex="-1">
            <div className="modal" role="document">
                <button className="close-btn" onClick={onClose} aria-label="Close report">Close</button>
                <h2 id="reportTitle">{reportData?.name || fileName}</h2>
                <div className="report-metadata">
                    <p><strong>Author:</strong> <span>{reportData?.author}</span></p>
                    <p><strong>Date:</strong> <span>{reportData?.dateCreated}</span></p>
                    <p><strong>Time:</strong> <span>{reportData?.timeCreated}</span></p>
                </div>
                <div className="report-content">
                    {reportData && (
                        <div>
                            {reportData.questions.filter(q => q.answer).map((question, index) => (
                                <div className={`report-section ${focusedIndex === index ? 'focused' : ''}`} key={index} aria-labelledby={`questionTitle${index}`} onClick={() => handleQuestionClick(index)}>
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
                        </div>
                    )}
                </div>
                <div className="report-footer">
                    <p>Total Score: {overallScore} / {maxPossibleScore}</p>
                    <p>
                        Overall Score:
                        <span className={`score score-${(Math.round((overallScore / maxPossibleScore) * 3))}`}>
                            {renderScore(Math.round((overallScore / maxPossibleScore) * 3))}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Report;
