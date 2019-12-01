const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    naam: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    wachtwoord: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
