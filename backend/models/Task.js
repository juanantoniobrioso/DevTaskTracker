// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    tecnologia: String,
    estado: { type: Boolean, default: false }, // false = Pendiente
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);