const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } = require('./env');

// Creamos el transport de nodemailer
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,                 // smtp.gmail.com
  port: Number(MAIL_PORT),         // 587
  secure: false,                   // 587 usa TLS STARTTLS (secure false)
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

// Función para mandar email de reset
const sendResetPasswordEmail = async (to, resetLink) => {
  // Armamos un HTML simple con un botón (en realidad es un link)
  const html = `
    <h2>Restablecer contraseña</h2>
    <p>Hacé click en el botón para crear una nueva contraseña. El enlace expira en 1 hora.</p>
    <a href="${resetLink}"
       style="display:inline-block;padding:12px 18px;background:#111;color:#fff;border-radius:8px;text-decoration:none;">
      Restablecer contraseña
    </a>
    <p style="margin-top:16px;">Si no fuiste vos, ignorá este correo.</p>
  `;

  // Enviamos
  await transporter.sendMail({
    from: MAIL_FROM,        // "Ecommerce Backend <...>"
    to,                     // destinatario
    subject: 'Recuperación de contraseña',
    html
  });
};

module.exports = { sendResetPasswordEmail };
