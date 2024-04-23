import React, { useEffect, useState } from 'react';
import '../CSS/multiViewReport.css';

const MultiViewReport = ({ files, onClose, colorBlindMode }) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose(focusedIndex);
            } else if (event.key === 'ArrowDown') {
                setFocusedIndex(prevIndex => Math.min(prevIndex + 1, files.length - 1));
            } else if (event.key === 'ArrowUp') {
                setFocusedIndex(prevIndex => Math.max(prevIndex - 1, -1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [files, focusedIndex, onClose]);

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

    const calculateScores = (reportData) => {
        const totalScore = reportData.questions.reduce((acc, question) => question.answer ? acc + question.score : acc, 0);
        const maxScore = reportData.questions.filter(question => question.answer).length * 3;
        const overallScore = Math.round((totalScore / maxScore) * 3); // Scale the score to the same range as renderScore expects
        return { totalScore, maxScore, overallScore };
    };

    return (
        <div className={`multi-view-report-overlay ${colorBlindMode}`}>
            {files.map((file, index) => {
                const { name, content } = file;
                const reportData = JSON.parse(content);
                const { totalScore, maxScore, overallScore } = calculateScores(reportData);

                return (
                    <div
                        key={index}
                        className={`multi-view-report ${focusedIndex === index ? 'focused' : ''}`}
                        role="dialog"
                        aria-labelledby={`reportTitle${index}`}
                        aria-modal="true"
                        tabIndex={0} // Make each report focusable
                        onClick={() => setFocusedIndex(index)} // Allow clicking to focus
                    >
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
                            <div className="report-footer">
                                <p>Total Score: {totalScore} / {maxScore}</p>
                                <p>
                                    Overall Score:
                                    <span className={`score score-${overallScore}`}>
                                        {renderScore(overallScore)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MultiViewReport;
