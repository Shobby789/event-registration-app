const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    howDidHear: { type: String, required: true },
  },
  {
    collection: "Tickets",
  }
);

mongoose.model("Tickets", ticketSchema);
