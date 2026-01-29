const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    tecnologia: String,
    estado: { type: Boolean, default: false }, // false = pendiente
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);