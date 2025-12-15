const UserModel = require('../models/user.model');

class UsersDAO {
  findByEmail(email) {
    return UserModel.findOne({ email });
  }

  findById(id) {
    return UserModel.findById(id);
  }

  create(userData) {
    return UserModel.create(userData);
  }

  updateById(id, data) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Para reset: buscar por token hasheado y que no esté vencido
  findByResetToken(tokenHash) {
    return UserModel.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: new Date() } // mayor que ahora => no vencido
    });
  }
}

module.exports = UsersDAO;
