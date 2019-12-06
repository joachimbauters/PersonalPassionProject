const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    naam: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    wachtwoord: { type: String, required: true },
    createdAbbonementen: [
      {
        type: Schema.Types.ObjectId,
        ref: "Abbonement"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
