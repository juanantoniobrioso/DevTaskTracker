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
    const pendingContainer = document.getElementById('pendingList');
    const completedContainer = document.getElementById('completedList');
    
    pendingContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        if (task.estado) {
            taskCard.classList.add('is-complete');
        }

        const actionButton = !task.estado 
            ? `<button class="btn-complete" onclick="toggleTask('${task._id}', true)">Completar</button>`
            : `<button class="btn-reopen" onclick="toggleTask('${task._id}', false)">Reabrir</button>`;

        taskCard.innerHTML = `
            <div>
                <div class="header-card">
                    <h3>${task.titulo}</h3>
                    <span class="badge ${task.estado ? 'status-done' : 'status-pending'}">
                        ${task.estado ? 'COMPLETADA' : 'PENDIENTE'}
                    </span>
                </div>
                <small>Tecnología: <strong>${task.tecnologia}</strong></small>
            </div>
            
            <div class="actions">
                ${actionButton}
                <button class="btn-delete" onclick="deleteTask('${task._id}')">Eliminar</button>
            </div>
        `;

        if (task.estado) {
            completedContainer.appendChild(taskCard);
        } else {
            pendingContainer.appendChild(taskCard);
        }
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

// 4. Actualizar estado (PUT)
async function toggleTask(id, nuevoEstado) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        fetchTasks(); 
    } catch (error) {
        console.error('Error actualizando tarea:', error);
    }
}