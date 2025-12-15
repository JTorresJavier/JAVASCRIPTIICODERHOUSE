const crypto = require('crypto');

class PurchaseService {
  constructor(cartsRepo, productsRepo, ticketsRepo) {
    this.cartsRepo = cartsRepo;
    this.productsRepo = productsRepo;
    this.ticketsRepo = ticketsRepo;
  }

  async purchaseCart(cid, purchaserEmail) {
    const cart = await this.cartsRepo.getById(cid);
    if (!cart) throw new Error('Cart not found');

    let amount = 0;
    const notPurchased = [];

    // Recorremos productos del carrito
    for (const item of cart.products) {
      const pid = item.product._id.toString();
      const qty = item.quantity;

      // Traemos producto actualizado de DB (stock real)
      const product = await this.productsRepo.getById(pid);
      if (!product) {
        // si el producto ya no existe, queda como no comprado
        notPurchased.push(item);
        continue;
      }

      // Si hay stock suficiente, compramos
      if (product.stock >= qty) {
        product.stock -= qty;              // descontamos stock
        await product.save();              // guardamos

        amount += product.price * qty;     // sumamos al total
      } else {
        // si no hay stock, queda pendiente
        notPurchased.push(item);
      }
    }

    // Creamos ticket (aunque amount sea 0, pero generalmente si es 0 podés decidir no crear)
    const ticket = await this.ticketsRepo.create({
      code: crypto.randomUUID(),
      purchase_datetime: new Date(),
      amount,
      purchaser: purchaserEmail
    });

    // Dejamos en el carrito solo lo no comprado
    cart.products = notPurchased.map(np => ({
      product: np.product._id,
      quantity: np.quantity
    }));

    await cart.save();

    return { ticket, notPurchased };
  }
}

module.exports = PurchaseService;
