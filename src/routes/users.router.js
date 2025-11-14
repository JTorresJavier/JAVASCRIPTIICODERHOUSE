// src/routes/users.router.js
const express = require('express');
const UserModel = require('../bd/models/user.model');

const router = express.Router();

// GET /api/users - Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find().select('-password'); // excluimos password
    return res.json({
      status: 'success',
      payload: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// GET /api/users/:id - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    return res.json({
      status: 'success',
      payload: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// PUT /api/users/:id - Actualizar usuario (sin cambiar password acá)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, age, role, cart } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { first_name, last_name, email, age, role, cart },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    return res.json({
      status: 'success',
      payload: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    return res.json({
      status: 'success',
      message: 'User deleted'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
