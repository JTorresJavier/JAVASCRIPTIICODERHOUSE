class ProductsRepository {
  constructor(productsDAO) { this.dao = productsDAO; }
  getAll() { return this.dao.getAll(); }
  getById(id) { return this.dao.getById(id); }
  create(data) { return this.dao.create(data); }
  update(id, data) { return this.dao.updateById(id, data); }
  delete(id) { return this.dao.deleteById(id); }
}
module.exports = ProductsRepository;
