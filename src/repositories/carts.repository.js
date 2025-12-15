class CartsRepository {
  constructor(cartsDAO) { this.dao = cartsDAO; }
  createCart() { return this.dao.createCart(); }
  getById(id) { return this.dao.getById(id); }
  update(id, data) { return this.dao.updateById(id, data); }
}
module.exports = CartsRepository;
