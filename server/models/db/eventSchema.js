const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventCreator: { type: String, required: true },
    eventTitle: { type: String, required: true, unique: true },
    discussionTopic: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    eventImage: { type: String, required: true },
    location: { type: String, required: true },
    summary: { type: String, required: true },
  },
  {
    collection: "Events",
  }
);

mongoose.model("Events", eventSchema);
