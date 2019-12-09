const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AbbonementSchema = new Schema(
  {
    asteroidId: { type: String, required: true },
    naam: { type: String, required: true },
    price: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    active: { type: Boolean, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Abbonement", AbbonementSchema);
