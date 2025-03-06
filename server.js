// server.js
const express = require('express');
const morgan = require('morgan'); // Middleware para logging
const app = express();
const port = process.env.PORT || 5000; // Puedes usar el puerto 5000 o definirlo en .env

// Middlewares
app.use(express.json());
app.use(morgan('dev')); // Log de peticiones en la consola
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta "public"

// Base de datos en memoria (para el prototipo)
let registeredUsers = {};

// Endpoint de LOGIN (usuario fijo para el prototipo)
app.post('/api/login', (req, res) => {
  try {
    const { user, userId } = req.body;
    if (!user || !userId) {
      return res.status(400).json({ success: false, message: 'Faltan credenciales.' });
    }
    // Credenciales fijas para el prototipo
    if (user === 'Prototipo1' && userId === '1234567890') {
      return res.json({ success: true, message: 'Login exitoso' });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en /api/login:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Endpoint de REGISTRO (simulado)
app.post('/api/register', (req, res) => {
  try {
    const { id, name, program, age, email, cell } = req.body;
    if (!id || !name || !program || !age || !email || !cell) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }
    if (registeredUsers[id]) {
      return res.status(400).json({ success: false, message: 'Ya existe un usuario con ese ID' });
    }
    // Registro del usuario (en memoria)
    registeredUsers[id] = { name, program, age, email, cell };
    return res.json({ success: true, message: 'Registro exitoso', user: registeredUsers[id] });
  } catch (error) {
    console.error('Error en /api/register:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
