import React, { useState } from 'react';
import './Upload.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Upload() {
    const [class10Marksheet, setClass10Marksheet] = useState(null);
    const [class12Marksheet, setClass12Marksheet] = useState(null);
    const [collegeMarksheet, setCollegeMarksheet] = useState(null);
    const [domicileCertificate, setDomicileCertificate] = useState(null);
    const [bankPassbook, setBankPassbook] = useState(null);
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [studentName, setStudentName] = useState('');  // New state for student name

    const handleFileChange = (event, setFile) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentName', studentName);  // Add the student name to formData
        formData.append('class10Marksheet', class10Marksheet);
        formData.append('class12Marksheet', class12Marksheet);
        formData.append('collegeMarksheet', collegeMarksheet);
        formData.append('domicileCertificate', domicileCertificate);
        formData.append('bankPassbook', bankPassbook);
        formData.append('incomeCertificate', incomeCertificate);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="upload-page">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <a className="navbar-brand" href="/">
                    <img src="https://imgs.search.brave.com/HIs9nvJTi6MbmeWbvC7yFkSb94lNBp7BB9V64XWFydE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzIyLzE0LzM0/LzM2MF9GXzEyMjE0/MzQ3M183S0RueUI3/dDNVYmk3NjBGWFFq/U0ZuOE9XMGFST0J0/TC5qcGc" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-3">
                            <a className="nav-link text-dark" href="/student-details">Student Details</a>
                        </li>
                        <li className="nav-item mr-3">
                            <a className="nav-link text-dark" href="/signin">Sign In</a>
                        </li>
                        <li className="nav-item mr-3">
                            <a className="nav-link text-dark" href="/signup">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Card Container */}
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card bg-light text-dark rounded-lg" style={{ width: '50%', padding: '20px' }}>
                    <div className="card-body">
                        <h1 className="card-title text-center">Upload Scanned Documents</h1>

                        {/* Name Input */}
                        <div className="upload-section">
                            <label htmlFor="studentName">Name of the Student:</label>
                            <input
                                type="text"
                                id="studentName"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                className="form-control mb-3"
                                required
                            />
                        </div>

                        {/* Marksheet of Class 10 */}
                        <div className="upload-section">
                            <label htmlFor="class10Marksheet">Marksheet of Class 10 (PDF format):</label>
                            <input type="file" id="class10Marksheet" accept=".pdf" onChange={(e) => handleFileChange(e, setClass10Marksheet)} className="form-control mb-3" />
                        </div>

                        {/* Marksheet of Class 12 */}
                        <div className="upload-section">
                            <label htmlFor="class12Marksheet">Marksheet of Class 12 (PDF format):</label>
                            <input type="file" id="class12Marksheet" accept=".pdf" onChange={(e) => handleFileChange(e, setClass12Marksheet)} className="form-control mb-3" />
                        </div>

                        {/* Marksheet of Last Passed College Examination/Diploma */}
                        <div className="upload-section">
                            <label htmlFor="collegeMarksheet">Marksheet of Last Passed College Examination/Diploma (PDF format):</label>
                            <input type="file" id="collegeMarksheet" accept=".pdf" onChange={(e) => handleFileChange(e, setCollegeMarksheet)} className="form-control mb-3" />
                        </div>

                        {/* Domicile Certificate */}
                        <div className="upload-section">
                            <label htmlFor="domicileCertificate">Domicile Certificate (PDF format):</label>
                            <input type="file" id="domicileCertificate" accept=".pdf" onChange={(e) => handleFileChange(e, setDomicileCertificate)} className="form-control mb-3" />
                        </div>

                        {/* Scanned Copy of Bank Passbook */}
                        <div className="upload-section">
                            <label htmlFor="bankPassbook">Scanned Copy of Bank Passbook (PDF format):</label>
                            <input type="file" id="bankPassbook" accept=".pdf" onChange={(e) => handleFileChange(e, setBankPassbook)} className="form-control mb-3" />
                        </div>

                        {/* Income Certificate */}
                        <div className="upload-section">
                            <label htmlFor="incomeCertificate">Income Certificate of Family (PDF format):</label>
                            <input type="file" id="incomeCertificate" accept=".pdf" onChange={(e) => handleFileChange(e, setIncomeCertificate)} className="form-control mb-3" />
                        </div>

                        {/* Save and Continue Button */}
                        <div className="button-container text-center">
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>Save and Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
