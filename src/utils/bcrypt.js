const bcrypt = require('bcrypt');

// Encripta contraseña en texto plano usando hashSync
const createHash = (passwordPlain) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwordPlain, salt);
  return hash;
};

// Compara contraseña en texto plano vs hash almacenado en el usuario
const isValidPassword = (passwordPlain, user) => {
  return bcrypt.compareSync(passwordPlain, user.password);
};

module.exports = {
  createHash,
  isValidPassword
};
