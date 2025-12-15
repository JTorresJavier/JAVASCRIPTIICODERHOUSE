const express = require('express');
const passport = require('passport');

module.exports = function buildSessionsRouter(controller) {
  const router = express.Router();

  router.post('/register', controller.register);
  router.post('/login', controller.login);

  // /current protegido + DTO
  router.get(
    '/current',
    passport.authenticate('current', { session: false }),
    controller.current
  );

  // reset password
  router.post('/forgot-password', controller.forgotPassword);
  router.post('/reset-password', controller.resetPassword);

  return router;
};
