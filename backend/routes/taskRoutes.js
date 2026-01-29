// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Importamos el modelo

// 1. GET /api/tasks - Obtener todas las tareas [cite: 36]
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ fecha: -1 }); // Las más nuevas primero
        res.json(tasks); // Devuelve JSON con las tareas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// 2. POST /api/tasks - Crear nueva tarea [cite: 36]
router.post('/', async (req, res) => {
    try {
        // Creamos la tarea con los datos que vienen del frontend (req.body)
        const newTask = new Task({
            titulo: req.body.titulo,
            tecnologia: req.body.tecnologia
        });
        
        const savedTask = await newTask.save(); // Guardar en MongoDB Atlas
        res.status(201).json(savedTask); // 201 = Creado con éxito
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la tarea' });
    }
});

// 3. DELETE /api/tasks/:id - Borrar tarea [cite: 37]
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

module.exports = router;