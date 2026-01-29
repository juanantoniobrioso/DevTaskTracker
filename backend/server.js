require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite recibir JSON en POST (RA2.a)

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API DevTask Tracker funcionando v1.0');
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});