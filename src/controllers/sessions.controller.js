const UserCurrentDTO = require('../dtos/userCurrent.dto');

class SessionsController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const user = await this.authService.register(req.body);

      // Respondemos sin password
      return res.status(201).json({
        status: 'success',
        payload: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          age: user.age,
          role: user.role,
          cart: user.cart
        }
      });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const token = await this.authService.login(req.body);
      return res.json({ status: 'success', token });
    } catch (err) {
      return res.status(401).json({ status: 'error', message: err.message });
    }
  };

  // /current (DTO)
  current = async (req, res) => {
    // req.user viene de passport current
    return res.json({ status: 'success', payload: new UserCurrentDTO(req.user) });
  };

  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      return res.json({ status: 'success', message: 'If the email exists, a reset link was sent.' });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      await this.authService.resetPassword(token, newPassword);
      return res.json({ status: 'success', message: 'Password updated successfully' });
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  };
}

module.exports = SessionsController;
