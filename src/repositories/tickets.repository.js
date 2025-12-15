class TicketsRepository {
  constructor(ticketsDAO) { this.dao = ticketsDAO; }
  create(data) { return this.dao.create(data); }
}
module.exports = TicketsRepository;
