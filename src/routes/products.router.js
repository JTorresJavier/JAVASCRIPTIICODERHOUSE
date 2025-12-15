const express = require('express');
const passport = require('passport');
const authorizeRole = require('../middlewares/authorizeRole');

module.exports = function buildProductsRouter(controller) {
  const router = express.Router();

  // Público: listar
  router.get('/', controller.getAll);

  // ADMIN: crear / actualizar / eliminar
  router.post(
    '/',
    passport.authenticate('current', { session: false }),
    authorizeRole('admin'),
    controller.create
  );

  router.put(
    '/:pid',
    passport.authenticate('current', { session: false }),
    authorizeRole('admin'),
    controller.update
  );

  router.delete(
    '/:pid',
    passport.authenticate('current', { session: false }),
    authorizeRole('admin'),
    controller.remove
  );

  return router;
};
