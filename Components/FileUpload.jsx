import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            alert("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed");
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <input 
                type="file" 
                onChange={handleFileChange} 
                style={{ marginBottom: '10px' }} 
            />
            <br />
            <button 
                onClick={handleUpload} 
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Upload
            </button>
            <div>
                <Dashboard/>
                </div>
        </div>
    );
}

export default FileUpload;