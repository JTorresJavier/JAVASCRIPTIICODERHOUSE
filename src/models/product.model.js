const mongoose = require('mongoose');

const productCollection = 'products';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },

  price: { type: Number, required: true },
  stock: { type: Number, required: true },

  code: { type: String, required: true, unique: true }, // código interno
  status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model(productCollection, ProductSchema);
