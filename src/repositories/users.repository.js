class UsersRepository {
  constructor(usersDAO) {
    this.dao = usersDAO;
  }

  getByEmail(email) { return this.dao.findByEmail(email); }
  getById(id) { return this.dao.findById(id); }
  create(userData) { return this.dao.create(userData); }
  update(id, data) { return this.dao.updateById(id, data); }
  getByResetToken(tokenHash) { return this.dao.findByResetToken(tokenHash); }
}

module.exports = UsersRepository;
