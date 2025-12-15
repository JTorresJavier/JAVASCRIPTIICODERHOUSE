const express = require('express');
const passport = require('passport');
const authorizeRole = require('../middlewares/authorizeRole');

module.exports = function buildCartsRouter(controller) {
  const router = express.Router();

  router.get('/:cid', controller.getCart);

  // SOLO USER puede agregar a carrito
  router.post(
    '/:cid/product/:pid',
    passport.authenticate('current', { session: false }),
    authorizeRole('user'),
    controller.addToCart
  );

  // SOLO USER compra
  router.post(
    '/:cid/purchase',
    passport.authenticate('current', { session: false }),
    authorizeRole('user'),
    controller.purchase
  );

  return router;
};
