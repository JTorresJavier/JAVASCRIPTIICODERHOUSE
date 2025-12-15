// Cargamos dotenv una sola vez acá
require('dotenv').config();

// Exportamos un objeto con variables de entorno
// Así evitás tener process.env por todos lados y centralizás config.
module.exports = {
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM,

  FRONT_URL: process.env.FRONT_URL
};
