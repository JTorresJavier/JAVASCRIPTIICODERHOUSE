// src/config/passport.config.js
const passport = require('passport');
const jwt = require('passport-jwt');
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const UserModel = require('../bd/models/user.model');
const { JWT_SECRET } = require('./config');

// Inicializamos las estrategias de Passport
const initializePassport = () => {
  passport.use('jwt', new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // lee token de Authorization: Bearer
      secretOrKey: JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        // jwtPayload es el objeto que firmamos al hacer login
        // buscamos el usuario en la base
        const user = await UserModel.findById(jwtPayload.id);
        if (!user) {
          return done(null, false); // no encontrado
        }

        // todo OK, devolvemos el usuario
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
};

module.exports = initializePassport;
