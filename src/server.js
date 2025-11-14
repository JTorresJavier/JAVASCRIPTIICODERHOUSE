// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config(); // <--- IMPORTANTE

const initializePassport = require('./config/passport.config');
const sessionsRouter = require('./routes/sessions.router');
const usersRouter = require('./routes/users.router');

const app = express();

// Middlewares para parsear body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a la base de datos MongoDB'))
  .catch((error) => console.error('❌ Error al conectar a la base de datos:', error));

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter); // register, login, current
app.use('/api/users', usersRouter);       // CRUD de usuarios

// Arrancar servidor
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
