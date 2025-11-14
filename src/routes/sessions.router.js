// src/routes/sessions.router.js
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../bd/models/user.model');
const { createHash, isValidPassword } = require('../utils/bcrypt');
const { JWT_SECRET } = require('../config/config');

const router = express.Router();

// ============================
// POST /api/sessions/register
// ============================
router.post('/register', async (req, res) => {
  console.log('BODY QUE LLEGA:', req.body);
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // 1) Validar campos
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }

    // 2) Verificar si el email ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    // 3) Encriptar contraseña
    const passwordHash = createHash(password);

    // 4) Crear usuario en DB
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: passwordHash,
      cart: null,
      role: 'user'
    });

    // 5) Devolver usuario sin password
    const userResponse = {
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      age: newUser.age,
      role: newUser.role,
      cart: newUser.cart
    };

    return res.status(201).json({
      status: 'success',
      payload: userResponse
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message
    });
  }
});

// ============================
// POST /api/sessions/login
// ============================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Validar entrada
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // 2) Buscar usuario
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // 3) Validar contraseña
    const isValid = isValidPassword(password, user);
    if (!isValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // 4) Crear payload del token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      cart: user.cart
    };

    // 5) Firmar token JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // 6) Devolver token
    return res.json({
      status: 'success',
      token
    });
  } catch (error) {
    console.error('Error on login:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ====================================
// GET /api/sessions/current (protegido)
// ====================================
// Usa la estrategia "jwt" de Passport
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // req.user viene desde la estrategia de passport
    const user = req.user;

    const userResponse = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cart: user.cart
    };

    return res.json({
      status: 'success',
      payload: userResponse
    });
  }
);

module.exports = router;
