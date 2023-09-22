const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    job: { type: String, required: true },
    // address: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "Users" }
);

mongoose.model("Users", userSchema);
