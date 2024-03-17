import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import schema from '../Reports/reportSchema.json'; // Import the JSON schema
import '../CSS/reports.css';
import Report from './Report'; // Import the Report component

const ajv = new Ajv();

const Reports = ({ darkMode }) => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [validFiles, setValidFiles] = useState([]);

    useEffect(() => {
        const validateFiles = async () => {
            const validatedFiles = [];

            for (const file of files) {
                try {
                    const data = JSON.parse(file.content);
                    const isValid = ajv.validate(schema, data);
                    if (isValid) {
                        validatedFiles.push(file);
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }

            setValidFiles(validatedFiles);
        };

        validateFiles();
    }, [files]);

    const handleFolderSelection = async () => {
        try {
            const folderHandle = await window.showDirectoryPicker();
            setSelectedFolder(folderHandle);

            const fileHandles = await folderHandle.values();
            const fileData = [];

            for await (const fileHandle of fileHandles) {
                if (fileHandle.kind === 'file' && fileHandle.name.endsWith('.json')) {
                    try {
                        const fileMetadata = await fileHandle.getFile();
                        const fileContent = await fileMetadata.text(); // Read file content as text
                        console.log('File Content:', fileContent); // Log the file content
                        const parsedData = JSON.parse(fileContent);
                        console.log('Parsed Data:', parsedData); // Log the parsed data
            
                        const isValid = ajv.validate(schema, parsedData);
                        console.log('Validation Result:', isValid); // Log the validation result
            
                        if (isValid) {
                            const lastModified = new Date(fileMetadata.lastModified);
                            const fileObject = {
                                name: fileHandle.name,
                                lastModified: lastModified.toLocaleString(), // Convert last modified date to a readable format
                                version: 1, // You can adjust this based on your application logic
                                content: fileContent, // Include file content in file object
                            };
                            fileData.push(fileObject);
                        }
                    } catch (error) {
                        console.error('Error processing file:', error);
                    }
                }
            }

            setFiles(fileData);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error selecting folder.');
            console.error('Error selecting folder:', error);
        }
    };

    const handleFileView = (fileName, fileContent) => {
        setSelectedFileName(fileName);
        setSelectedFileContent(fileContent);
    };

    const handleCloseModal = () => {
        setSelectedFileContent(null);
    };

    return (
        <div className={darkMode ? 'reports-container dark' : 'reports-container light'}>
            <h2>Reports</h2>
            <div className="header">
                <div className="current-folder">
                    <span>Current Folder: {selectedFolder ? selectedFolder.name : ''}</span>
                </div>
                <button className="open-folder-btn" onClick={handleFolderSelection}>Open Folder</button>
            </div>
            {error && <p className="error-message">Error: {error}</p>}
            {selectedFolder && (
                <div className="files-list-container">
                    <table className="files-table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Last Modified</th>
                                <th>Report Version</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validFiles.map((file, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="file-name-container">
                                            {file.name}
                                            <button onClick={() => handleFileView(file.name, file.content)}>View</button>
                                        </div>
                                    </td>
                                    <td>{file.lastModified}</td>
                                    <td>{file.version}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedFileContent && (
                <Report fileName={selectedFileName} fileContent={selectedFileContent} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Reports;
