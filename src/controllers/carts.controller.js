class CartsController {
  constructor(cartsService, purchaseService) {
    this.cartsService = cartsService;
    this.purchaseService = purchaseService;
  }

  getCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await this.cartsService.getCart(cid);
      return res.json({ status: 'success', payload: cart });
    } catch (err) {
      return res.status(404).json({ status: 'error', message: err.message });
    }
  };

  addToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await this.cartsService.addProductToCart(cid, pid, quantity);
      return res.json({ status: 'success', payload: cart });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  purchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const purchaserEmail = req.user.email; // user autenticado
      const result = await this.purchaseService.purchaseCart(cid, purchaserEmail);

      return res.json({
        status: 'success',
        payload: result
      });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };
}

module.exports = CartsController;
