const ProductModel = require('../models/product.model');

class ProductsDAO {
  getAll() { return ProductModel.find(); }
  getById(id) { return ProductModel.findById(id); }
  create(data) { return ProductModel.create(data); }
  updateById(id, data) { return ProductModel.findByIdAndUpdate(id, data, { new: true }); }
  deleteById(id) { return ProductModel.findByIdAndDelete(id); }
}

module.exports = ProductsDAO;
