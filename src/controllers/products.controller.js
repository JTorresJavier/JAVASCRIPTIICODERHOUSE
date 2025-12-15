class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  getAll = async (req, res) => {
    const products = await this.productsService.getAll();
    return res.json({ status: 'success', payload: products });
  };

  create = async (req, res) => {
    try {
      const product = await this.productsService.create(req.body);
      return res.status(201).json({ status: 'success', payload: product });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  update = async (req, res) => {
    try {
      const { pid } = req.params;
      const updated = await this.productsService.update(pid, req.body);
      return res.json({ status: 'success', payload: updated });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  remove = async (req, res) => {
    try {
      const { pid } = req.params;
      await this.productsService.delete(pid);
      return res.json({ status: 'success', message: 'Product deleted' });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };
}

module.exports = ProductsController;
