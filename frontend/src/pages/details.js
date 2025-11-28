import React, { useState, useEffect } from 'react';
import '../App.css';

const StudentDetails = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    // Fetch uploaded documents from the backend
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/upload');
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    const handleSelectDocument = (id) => {
        const document = documents.find((doc) => doc._id === id);
        setSelectedDocument(document);
    };

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/upload/approve/${selectedDocument._id}`, {
                method: 'PUT',
            });
            const data = await response.json();
            alert('Document approved successfully');
            // Optionally refresh the document data after approval
            const updatedDocuments = documents.map(doc =>
                doc._id === data.document._id ? data.document : doc
            );
            setDocuments(updatedDocuments);
            setSelectedDocument(data.document);
        } catch (error) {
            console.error('Error approving document:', error);
        }
    };

    return (
        <div className="student-details">
            <header style={headerStyle}>
                <h1>Review Uploaded Documents</h1>
            </header>

            <div className="container">
                <section className="dashboard">
                    <h2>Select a Student Submission</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSelectDocument(e.target.submission.value);
                        }}
                    >
                        <label htmlFor="submission">Choose Submission:</label>
                        <select id="submission" name="submission" required>
                            <option value="">Select Submission</option>
                            {documents.map((doc) => (
                                <option key={doc._id} value={doc._id}>
                                    {`Submission #${doc._id} - ${doc.studentName || 'No Name Provided'}`}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="button">View Details</button>
                    </form>
                </section>

                {selectedDocument && (
                    <>
                        <div className="dashboard">
                            <div className="submission-details">
                                <h3>Document Details</h3>
                                <p><strong>ID:</strong> {selectedDocument._id}</p>
                                <p><strong>Class 10 Marksheet:</strong> <a href={`/${selectedDocument.class10Marksheet}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>Class 12 Marksheet:</strong> <a href={`/${selectedDocument.class12Marksheet}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>College Marksheet:</strong> <a href={`/${selectedDocument.collegeMarksheet}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>Domicile Certificate:</strong> <a href={`/${selectedDocument.domicileCertificate}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>Bank Passbook:</strong> <a href={`/${selectedDocument.bankPassbook}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>Income Certificate:</strong> <a href={`/${selectedDocument.incomeCertificate}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p><strong>Approved:</strong> {selectedDocument.approved ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            {!selectedDocument.approved && (
                                <button className="btn btn-success" onClick={handleApprove}>Approve Documents</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const headerStyle = {
    background: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
};

export default StudentDetails;
