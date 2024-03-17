// NewReport.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/newReport.css'; // Import your CSS file for styling
import { questions } from '../Reports/reportQuestions'; // Import the questions array

const NewReport = ({ darkMode }) => {
    // State to store form data
    const [formData, setFormData] = useState({});

    const navigate = useNavigate(); // Use useNavigate hook to navigate

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.name || !formData.author) {
            alert('Please provide a name and author for the report.');
            return;
        }

        // Generate JSON object from form data
        const reportData = {
            name: formData.name,
            dateCreated: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
            timeCreated: new Date().toTimeString().split(' ')[0], // Current time in HH:MM:SS format
            version: 1, // You can adjust this based on your application logic
            author: formData.author,
            questions: questions.map((questionObj, index) => ({
                text: questionObj.question,
                answer: formData[`answer${index + 1}`] || '', // Use form input to populate the answer field
                score: formData[`answer${index + 1}`] ? 3 - questionObj.answers.findIndex(answer => answer === formData[`answer${index + 1}`]) : 0 // Calculate the score for each question based on 3 - answerIndex if answer is selected, otherwise set it to 0
            }))
        };

        // Convert JSON object to a Blob
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = `${formData.name}.json`; // Set filename to report name
        // Trigger the anchor click to initiate download
        anchor.click();

        // Clean up
        URL.revokeObjectURL(anchor.href);

        // Navigate to the downloads route
        navigate('/reports');
    };

    // Function to handle form input changes for dropdowns
    const handleDropdownChange = (event, questionIndex) => {
        const { value } = event.target;
        setFormData({ ...formData, [`answer${questionIndex + 1}`]: value });
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
