import React, { useState } from 'react';
import '../CSS/mainPage.css';
import '../CSS/multiViewReport.css';
import reportData1 from '../Reports/Bosch Report.json';
import reportData2 from '../Reports/(Amazon) Ring Camera Report.json';
import reportData3 from '../Reports/Eufy Report.json';
import reportData4 from '../Reports/Google Nest Report .json';

const reportFiles = [reportData1, reportData2, reportData3, reportData4];

const MainPage = ({ darkMode, onToggleDarkMode, colorBlindMode }) => {
    const [currentReportIndex, setCurrentReportIndex] = useState(0);

    const renderScore = (score) => {
        switch (score) {
            case 3: return '++';
            case 2: return '+';
            case 1: return '-';
            case 0: return 'X';
            default: return '';
        }
    };

    const nextReport = () => {
        setCurrentReportIndex((currentReportIndex + 1) % reportFiles.length);
    };

    const previousReport = () => {
        setCurrentReportIndex((currentReportIndex - 1 + reportFiles.length) % reportFiles.length);
    };

    const reportData = reportFiles[currentReportIndex]; // Get the current report data

    return (
        <div className={`mainDiv ${darkMode ? 'darkMode' : ''} ${colorBlindMode}`}>
            <div className={`multi-view-report ${colorBlindMode}`}>
                <div className={`multi-view-report ${colorBlindMode}`}>
                    <div className="report-metadata">
                        <h2>{reportData.name}</h2> 
                        <p><strong>Author:</strong> <span>{reportData.author}</span></p>
                        <p><strong>Date:</strong> <span>{reportData.date}</span></p>
                        <p><strong>Time:</strong> <span>{reportData.time}</span></p>
                    </div>
                    <div className="report-content">
                        {reportData.questions.map((question, index) => (
                            <div key={index} className="single-report question-item">
                                <h3 className="question-text">{index + 1}. {question.text}</h3>
                                <span className={`score score-${question.score} ${colorBlindMode}`} aria-hidden="true">
                                    {renderScore(question.score)}
                                </span>
                                <p className="principle">Principle: {question.principle}</p>
                                <p className="answer"><strong>Answer:</strong> {question.answer}</p>
                                {question.explanation && (
                                    <div className={`explanation ${colorBlindMode}`}>{question.explanation}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="report-navigation">
                        <button onClick={previousReport} className="carousel-button">&#60;</button>
                        <button onClick={nextReport} className="carousel-button">&#62;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
