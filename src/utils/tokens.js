const crypto = require('crypto');

// Genera token random (para reset password)
const generateRandomToken = () => crypto.randomBytes(32).toString('hex');

// Hashea token antes de guardarlo en DB (más seguro que guardarlo en texto plano)
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

module.exports = { generateRandomToken, hashToken };
