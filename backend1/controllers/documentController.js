const Document = require('../models/document');

// Fetch all documents
const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
};

// Approve a document
const approveDocument = async (req, res) => {
    const documentId = req.params.id;

    try {
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check if already approved
        if (document.approved) {
            return res.status(400).json({ message: 'Document is already approved' });
        }

        document.approved = true;
        const updatedDocument = await document.save();

        res.status(200).json({ message: 'Document approved successfully', document: updatedDocument });
    } catch (error) {
        res.status(500).json({ message: 'Error approving document', error });
    }
};

module.exports = { getAllDocuments, approveDocument };
