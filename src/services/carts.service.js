class CartsService {
  constructor(cartsRepo, productsRepo) {
    this.cartsRepo = cartsRepo;
    this.productsRepo = productsRepo;
  }

  async getCart(cid) {
    const cart = await this.cartsRepo.getById(cid);
    if (!cart) throw new Error('Cart not found');
    return cart;
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await this.cartsRepo.getById(cid);
    if (!cart) throw new Error('Cart not found');

    const product = await this.productsRepo.getById(pid);
    if (!product) throw new Error('Product not found');

    // Si ya existe en el carrito, sumamos cantidad
    const idx = cart.products.findIndex(p => p.product._id.toString() === pid);
    if (idx !== -1) {
      cart.products[idx].quantity += Number(quantity);
    } else {
      cart.products.push({ product: pid, quantity: Number(quantity) });
    }

    await cart.save();
    return cart;
  }
}

module.exports = CartsService;
