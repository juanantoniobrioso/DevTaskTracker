# DevTask Tracker

Aplicación FullStack para la gestión de tareas de desarrollo.

## Tecnologías Utilizadas
- **Frontend:** HTML5 Semántico, CSS3, JavaScript.
- **Backend:** Node.js, Express.
- **Base de Datos:** MongoDB Atlas (Mongoose).

## Requisitos Previos
- Tener instalado **Node.js**.
- Tener una cuenta en **MongoDB Atlas**.

## Instalación y Configuración

Sigue estos pasos para arrancar el proyecto en tu máquina local:

**1. Crear archivo .env**
Crea un archivo llamado `.env` en la raíz y pega el siguiente contenido (sustituye `<USUARIO>` y `<CONTRASEÑA>` por las tuyas):

```
PORT=3000
MONGO_URI=mongodb+srv://<USUARIO>:<CONTRASEÑA>@cluster0.xxxxx.mongodb.net/devtasktracker?retryWrites=true&w=majority
```

**2. Instala las dependencias**
Abre la consola en el proyecto y ejecuta el siguiente comando
```
npm install
```

**3. Arrancar el servidor**
Para encender el servidor hay que ejecutar en la misma consola este comando
```
node backend/server.js
```