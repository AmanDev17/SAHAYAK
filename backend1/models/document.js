const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    class10Marksheet: { type: String, required: true },
    class12Marksheet: { type: String, required: true },
    collegeMarksheet: { type: String, required: true },
    domicileCertificate: { type: String, required: true },
    bankPassbook: { type: String, required: true },
    incomeCertificate: { type: String, required: true },
    approved: { type: Boolean, default: false },  // Document approval status
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
