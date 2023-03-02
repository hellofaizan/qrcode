const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema({
    qrCode: {
        type: String,
        required: true
    },
    qrName: {
        type: String,
        required: true
    }
} , {timestamps: true});

mongoose.models = {};
module.exports = mongoose.model('QR', qrSchema);