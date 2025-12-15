class UserCurrentDTO {
  constructor(user) {
    // OJO: NO password, NO resetToken, etc.
    this.id = user._id.toString();
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.cart = user.cart;
  }
}

module.exports = UserCurrentDTO;
