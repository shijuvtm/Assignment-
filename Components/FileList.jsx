import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileList.css'; // Import the CSS file for styling

function FileList() {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        async function fetchFiles() {
            try {
                const response = await axios.get("http://localhost:5000/files");
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        }
        fetchFiles();
    }, []);
    return (
        <div className="file-list-container">
            <h2>Uploaded Files</h2>
            <ul className="file-list">
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;