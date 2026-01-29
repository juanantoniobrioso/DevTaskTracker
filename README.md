# DevTask Tracker 

Aplicación FullStack para la gestión de tareas de desarrollo (Pendientes/Completadas).

## Tecnologías Utilizadas
- **Frontend:** HTML5 Semántico, CSS3 (Grid/Flexbox), JavaScript (ES6+ fetch/async-await).
- **Backend:** Node.js, Express.
- **Base de Datos:** MongoDB Atlas (Mongoose).

## Requisitos Previos
- Tener instalado **Node.js**.
- Tener una cuenta en **MongoDB Atlas**.

## Instalación y Configuración

Sigue estos pasos para arrancar el proyecto en tu máquina local:

    ### Pegar esto en un archivo creado manualmente .env (cambiar <USUARIO> y <CONTRASEÑA> por la tuya)
    PORT=3000
    MONGO_URI=mongodb+srv://<USUARIO>:<CONTRASEÑA>@cluster0.xxxxx.mongodb.net/devtasktracker?retryWrites=true&w=majority

    ### Instalar las dependencias poniendo esto desde la consola
    npm install