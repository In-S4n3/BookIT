const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: String,
  hour: String,
  restaurantName: String,
  restaurantAddress: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;