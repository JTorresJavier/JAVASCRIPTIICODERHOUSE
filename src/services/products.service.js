class ProductsService {
  constructor(productsRepo) {
    this.productsRepo = productsRepo;
  }

  getAll() { return this.productsRepo.getAll(); }
  getById(id) { return this.productsRepo.getById(id); }

  create(data) {
    // Validación mínima
    const { title, price, stock, code } = data;
    if (!title || price == null || stock == null || !code) throw new Error('Missing required product fields');
    return this.productsRepo.create(data);
  }

  update(id, data) { return this.productsRepo.update(id, data); }
  delete(id) { return this.productsRepo.delete(id); }
}

module.exports = ProductsService;
