const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const UserModel = require('../models/user.model');
const { JWT_SECRET } = require('./env');

module.exports = function initializePassport() {
  // Strategy "current": la usan en la consigna
  // Lee el Bearer token y carga req.user desde Mongo
  passport.use('current', new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer xxx
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // payload lo firmás en login, ej: { id, role, email }
        const user = await UserModel.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user); // esto termina en req.user
      } catch (err) {
        return done(err);
      }
    }
  ));
};
