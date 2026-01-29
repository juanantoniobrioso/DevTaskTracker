const API_URL = '/api/tasks';

// 1. Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

// Función para obtener tareas (GET)
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

// Función para pintar tareas en el DOM
function renderTasks(tasks) {
    const container = document.getElementById('tasksList');
    container.innerHTML = ''; 

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        const estadoTexto = task.estado ? 'Completada' : 'Pendiente';
        const estadoClase = task.estado ? 'status-done' : 'status-pending';

        if(task.estado) taskCard.classList.add('is-complete');

        taskCard.innerHTML = `
            <div>
                <div class="header-card">
                    <h3>${task.titulo}</h3>
                    <span class="badge ${estadoClase}">${estadoTexto}</span>
                </div>
                <small>Tecnología: <strong>${task.tecnologia}</strong></small>
            </div>
            <button class="btn-delete" onclick="deleteTask('${task._id}')">Eliminar</button>
        `;
        container.appendChild(taskCard);
    });
}

// 2. Crear nueva tarea (POST)
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const estado = document.getElementById('estado').value === 'true'; 

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, tecnologia, estado }) 
        });
        
        document.getElementById('taskForm').reset(); 
        fetchTasks(); 
    } catch (error) {
        console.error('Error:', error);
    }
});

// 3. Eliminar tarea (DELETE)
async function deleteTask(id) {
    if(!confirm('¿Seguro que quieres borrar esta tarea?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks(); // Recargar lista
    } catch (error) {
        console.error('Error eliminando tarea:', error);
    }
}