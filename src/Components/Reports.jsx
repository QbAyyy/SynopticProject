import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import schema from '../Reports/reportSchema.json';
import '../CSS/reports.css';
import Report from './Report';
import MultiViewReport from './MultiViewReport'; // Import the MultiViewReport component

const ajv = new Ajv();

const Reports = ({ darkMode }) => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [validFiles, setValidFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showMultiView, setShowMultiView] = useState(false);

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
                        const fileContent = await fileMetadata.text();
                        const parsedData = JSON.parse(fileContent);
                        const isValid = ajv.validate(schema, parsedData);

                        if (isValid) {
                            const lastModified = new Date(fileMetadata.lastModified);
                            const fileObject = {
                                name: fileHandle.name,
                                lastModified: lastModified.toLocaleString(),
                                version: 1,
                                content: fileContent,
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

    const handleFileSelectionToggle = (fileName) => {
        const isSelected = selectedFiles.includes(fileName);
        if (isSelected) {
            setSelectedFiles(selectedFiles.filter((name) => name !== fileName));
        } else {
            setSelectedFiles([...selectedFiles, fileName]);
        }
    };

    const handleMultiViewButtonClick = () => {
        if (selectedFiles.length > 0){
            setShowMultiView(true);
            }
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
                    <table className={darkMode ? "files-table-dark" : "files-table"}>
                        <thead>
                            <tr>
                                <th>
                                    <button onClick={handleMultiViewButtonClick}>View Selected</button>
                                </th>
                                <th>Report Name</th>
                                <th>Last Modified</th>
                                <th>Report Version</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validFiles.map((file, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.includes(file.name)}
                                            onChange={() => handleFileSelectionToggle(file.name)}
                                        />
                                    </td>
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
            {showMultiView && (
                <MultiViewReport
                    files={validFiles.filter((file) => selectedFiles.includes(file.name))}
                    onClose={() => setShowMultiView(false)}
                />
            )}
        </div>
    );
};

export default Reports;
