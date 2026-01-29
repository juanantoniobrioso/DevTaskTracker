const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

// 1. GET /api/tasks - Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ fecha: -1 }); // Las más nuevas primero
        res.json(tasks); // Devuelve JSON con las tareas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

// 2. POST /api/tasks - Crear nueva tarea 
router.post('/', async (req, res) => {
    try {
        // Creamos la tarea con los datos que vienen del frontend (req.body)
        const newTask = new Task({
            titulo: req.body.titulo,
            tecnologia: req.body.tecnologia,
            estado: req.body.estado
        });
        
        const savedTask = await newTask.save(); // Guardar en MongoDB Atlas
        res.status(201).json(savedTask); 
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la tarea' });
    }
});

// 3. DELETE /api/tasks/:id - Borrar tarea 
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

// 4. PUT /api/tasks/:id - Actualizar estado de la tarea
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { estado: req.body.estado }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

module.exports = router;