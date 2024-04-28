import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/newReport.css'; 
import { questions } from '../Reports/reportQuestions';

const NewReport = ({ darkMode, colorBlindMode }) => {
    const [formData, setFormData] = useState({});
    const [explanations, setExplanations] = useState({});

    const navigate = useNavigate(); 

    const handleExplanationChange = (event, questionIndex) => {
            const { value } = event.target;
            setExplanations({ ...explanations, [questionIndex]: value });
        };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.name || !formData.author) {
            alert('Please provide a name and author for the report.');
            return;
        }

        const reportData = {
            name: formData.name,
            dateCreated: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            timeCreated: new Date().toTimeString().split(' ')[0], // Current time in HH:MM:SS format
            version: 1, 
            author: formData.author,
            questions: questions.map((questionObj, index) => {
                const answerIndex = questionObj.answers.findIndex(answer => answer === formData[`answer${index + 1}`]);
                return {
                    text: questionObj.question,
                    answer: formData[`answer${index + 1}`] || '',
                    explanation: answerIndex !== 0 ? explanations[index] || '' : '', // Add explanation if answer is not top score
                    score: formData[`answer${index + 1}`] ? 3 - questionObj.answers.findIndex(answer => answer === formData[`answer${index + 1}`]) : 0, // Calculate the score for each question based on 3 - answerIndex if answer is selected, otherwise set it to 0
                    principle: questionObj.principle
                };
            }),
        };

        // Convert JSON object to a Blob
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });

        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = `${formData.name}.json`; 
        anchor.click();
        URL.revokeObjectURL(anchor.href);

        navigate('/reports');
    };

    const handleDropdownChange = (event, questionIndex) => {
        const { value } = event.target;
        const answerIndex = questions[questionIndex].answers.findIndex(answer => answer === value);

        setFormData({ ...formData, [`answer${questionIndex + 1}`]: value });

        if (answerIndex === 0) {
            setExplanations({ ...explanations, [questionIndex]: '' });
        }
    };

    return (
        <div className={`new-report-container ${darkMode ? 'dark-mode' : ''}`}>
            <form onSubmit={handleSubmit}>
                {questions.map((questionObj, index) => (
                    <div key={index} className="question">
                        <div className="question-number"></div>
                        <label htmlFor={`question${index + 1}`} className={`question-label ${darkMode ? 'dark-mode' : ''}`}>
                            {index + 1}. {questionObj.question}
                        </label>
                        <select
                            id={`question${index + 1}`}
                            name={`answer${index + 1}`}
                            className={`question-input ${darkMode ? 'dark-mode' : ''}`}
                            onChange={(event) => handleDropdownChange(event, index)}
                        >
                            <option value="">Select an answer...</option>
                            {questionObj.answers.map((answer, answerIndex) => (
                                <option key={answerIndex} value={answer}>
                                    {answer}
                                </option>
                            ))}
                        </select>
                        {
                            // Show additional information input if the answer is not the top score
                            formData[`answer${index + 1}`] && questions[index].answers.findIndex(answer => answer === formData[`answer${index + 1}`]) !== 0 &&
                            <textarea
                                id={`explanation${index + 1}`}
                                name={`explanation${index + 1}`}
                                placeholder="Please provide additional information..."
                                value={explanations[index] || ''}
                                onChange={(event) => handleExplanationChange(event, index)}
                                className={`explanation-input ${darkMode ? 'dark-mode' : ''}`}
                            ></textarea>
                        }
                    </div>
                ))}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author || ''}
                        onChange={(event) => setFormData({ ...formData, author: event.target.value })}
                    />
                </div>
                <button type="submit" className={`submit-button ${darkMode ? 'dark-mode' : ''}`}>Submit</button>
            </form>
        </div>
    );
};

export default NewReport;
