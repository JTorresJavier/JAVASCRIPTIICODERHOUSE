const mongoose = require('mongoose');

const ticketCollection = 'tickets';

const TicketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },  // código único del ticket
  purchase_datetime: { type: Date, required: true },     // fecha compra
  amount: { type: Number, required: true },              // total
  purchaser: { type: String, required: true }            // email del comprador
}, { timestamps: true });

module.exports = mongoose.model(ticketCollection, TicketSchema);
