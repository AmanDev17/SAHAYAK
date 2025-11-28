// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const Document = require('../models/document');
const { getAllDocuments, approveDocument } = require('../controllers/documentController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Upload document route
router.post('/', upload.fields([
    { name: 'class10Marksheet', maxCount: 1 },
    { name: 'class12Marksheet', maxCount: 1 },
    { name: 'collegeMarksheet', maxCount: 1 },
    { name: 'domicileCertificate', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 }
]), async (req, res) => {
    try {
        const newDocument = new Document({
            class10Marksheet: req.files.class10Marksheet ? req.files.class10Marksheet[0].path : '',
            class12Marksheet: req.files.class12Marksheet ? req.files.class12Marksheet[0].path : '',
            collegeMarksheet: req.files.collegeMarksheet ? req.files.collegeMarksheet[0].path : '',
            domicileCertificate: req.files.domicileCertificate ? req.files.domicileCertificate[0].path : '',
            bankPassbook: req.files.bankPassbook ? req.files.bankPassbook[0].path : '',
            incomeCertificate: req.files.incomeCertificate ? req.files.incomeCertificate[0].path : ''
        });

        await newDocument.save();
        res.status(201).json({ message: 'Documents uploaded successfully', document: newDocument });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading documents', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
});
router.put('/approve/:id', isAdmin, approveDocument);

module.exports = router;
