require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite recibir JSON en POST (RA2.a)
app.use(express.static('frontend'));

// Importar rutas
const taskRoutes = require('./routes/taskRoutes');

//Usar rutas
app.use('/api/tasks', taskRoutes);

//Conectar base de datos
console.log("Intentando conectar a MongoDB..."); 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((error) => console.error('❌ Error de conexión:', error));


// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});