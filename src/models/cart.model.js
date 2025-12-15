const mongoose = require('mongoose');

const cartCollection = 'carts';

const CartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model(cartCollection, CartSchema);
