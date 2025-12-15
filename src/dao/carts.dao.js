const CartModel = require('../models/cart.model');

class CartsDAO {
  createCart() { return CartModel.create({ products: [] }); }

  getById(id) {
    // populate para traer info del producto al ver carrito
    return CartModel.findById(id).populate('products.product');
  }

  updateById(id, data) {
    return CartModel.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = CartsDAO;
