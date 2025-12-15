const jwt = require('jsonwebtoken');

const { createHash, isValidPassword, comparePasswordPlainWithHash } = require('../utils/bcrypt');
const { generateRandomToken, hashToken } = require('../utils/tokens');
const { sendResetPasswordEmail } = require('../config/mailer');
const { JWT_SECRET, FRONT_URL } = require('../config/env');

class AuthService {
  constructor(usersRepo, cartsRepo) {
    this.usersRepo = usersRepo;
    this.cartsRepo = cartsRepo;
  }

  async register({ first_name, last_name, email, age, password }) {
    // Validaciones mínimas
    if (!first_name || !last_name || !email || !age || !password) {
      throw new Error('Missing required fields');
    }

    // Ver si existe
    const existing = await this.usersRepo.getByEmail(email);
    if (existing) throw new Error('User already exists');

    // Creamos carrito para el user (ecommerce real)
    const cart = await this.cartsRepo.createCart();

    // Hasheamos password
    const passwordHash = createHash(password);

    // Creamos user
    const newUser = await this.usersRepo.create({
      first_name,
      last_name,
      email,
      age,
      password: passwordHash,
      cart: cart._id,
      role: 'user'
    });

    return newUser;
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error('Email and password are required');

    const user = await this.usersRepo.getByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const ok = isValidPassword(password, user);
    if (!ok) throw new Error('Invalid credentials');

    // Payload: poné lo mínimo útil (id, role, email)
    const payload = { id: user._id, email: user.email, role: user.role };

    // Token expira 1h (bien)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return token;
  }

  // ---- FORGOT PASSWORD ----
  async forgotPassword(email) {
    // No revelamos si existe o no (buena práctica)
    const user = await this.usersRepo.getByEmail(email);
    if (!user) return;

    // Token random + guardamos hash en DB
    const token = generateRandomToken();
    const tokenHash = hashToken(token);

    // Expira 1 hora
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await this.usersRepo.update(user._id, {
      resetPasswordToken: tokenHash,
      resetPasswordExpires: expires
    });

    // Link (puede ser ficticio)
    const link = `${FRONT_URL}/reset-password?token=${token}`;

    // Enviamos mail
    await sendResetPasswordEmail(user.email, link);
  }

  // ---- RESET PASSWORD ----
  async resetPassword(token, newPassword) {
    if (!token || !newPassword) throw new Error('Token and newPassword are required');

    const tokenHash = hashToken(token);

    // Busca user con token válido y NO vencido
    const user = await this.usersRepo.getByResetToken(tokenHash);
    if (!user) throw new Error('Invalid or expired token');

    // Evitar que use la misma contraseña anterior
    const same = comparePasswordPlainWithHash(newPassword, user.password);
    if (same) throw new Error('New password cannot be the same as the previous one');

    // Guardar nueva password + limpiar token
    const newHash = createHash(newPassword);

    await this.usersRepo.update(user._id, {
      password: newHash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });
  }
}

module.exports = AuthService;
