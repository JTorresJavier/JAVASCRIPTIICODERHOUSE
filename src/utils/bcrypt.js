const bcrypt = require('bcrypt');

// Hashea password plano
const createHash = (passwordPlain) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(passwordPlain, salt);
};

// Compara password plano vs hash del user
const isValidPassword = (passwordPlain, user) => {
  return bcrypt.compareSync(passwordPlain, user.password);
};

// Para el reset: comparar un password nuevo con hash viejo (sin necesitar user entero)
const comparePasswordPlainWithHash = (passwordPlain, hash) => {
  return bcrypt.compareSync(passwordPlain, hash);
};

module.exports = { createHash, isValidPassword, comparePasswordPlainWithHash };
