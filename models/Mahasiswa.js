const mongoose = require('mongoose');
const { Schema } = mongoose;

const mahasiswaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        max: 100
    },
    postCode: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);