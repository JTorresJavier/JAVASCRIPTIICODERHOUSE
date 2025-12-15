const mongoose = require('mongoose');

const userCollection = 'users';

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },

  email: { type: String, required: true, unique: true },
  age:   { type: Number, required: true },

  password: { type: String, required: true },

  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', default: null },

  role: { type: String, default: 'user', enum: ['user', 'admin'] },

  // --- RESET PASSWORD ---
  resetPasswordToken: { type: String, default: null },  // guardamos el hash del token
  resetPasswordExpires: { type: Date, default: null }   // expiración 1h
}, { timestamps: true });

module.exports = mongoose.model(userCollection, UserSchema);
