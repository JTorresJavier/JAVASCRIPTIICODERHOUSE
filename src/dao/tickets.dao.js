const TicketModel = require('../models/ticket.model');

class TicketsDAO {
  create(data) { return TicketModel.create(data); }
}

module.exports = TicketsDAO;
