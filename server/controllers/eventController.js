const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const EventModel = mongoose.model("Events");
const TicketModal = mongoose.model("Tickets");
app.use("/uploads", express.static("uploads"));
router.use(express.static(__dirname + "./public/"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports.createEvent = async (req, res) => {
  const {
    eventCreator,
    eventTitle,
    discussionTopic,
    eventType,
    eventDate,
    eventImage,
  } = req.body;
  const { filename } = req.file;
  try {
    const findEvent = await EventModel.findOne({ eventTitle });
    if (findEvent) {
      return res.status(201).send({ status: "This event is already created." });
    }
    await EventModel.create({
      eventCreator,
      eventTitle,
      discussionTopic,
      eventType,
      eventDate,
      eventTime: filename,
      eventImage,
    });
    res.status(201).json({ status: "Event created successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ status: "Something went wrong. Event could not be registered" });
    console.log("create event error >>> ", error);
  }
};

module.exports.getEventDetails = async (req, res) => {
  const { _id } = req.params;
  // console.log("_id >> ", _id);
  try {
    const all_events = await EventModel.findOne({ _id });
    res.status(201).json(all_events);
  } catch (error) {
    console.log("getEventDetails errror >>> ", error);
  }
};

module.exports.getCategorizedEvents = async (req, res) => {
  const { category } = req.params;
  // console.log("Category >> ", category);
  try {
    const categorizedEvents = await EventModel.find({
      eventType: category,
    });
    if (categorizedEvents.length > 0) {
      return res.status(201).json(categorizedEvents);
    }
  } catch (error) {
    res.status(400).json({ status: "Error", error: error });
  }
};

module.exports.bookTicket = async (req, res) => {
  const { _id } = req.params;
  // console.log("eventId >> ", _id);
  const {
    userId,
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    howDidHear,
  } = req.body;
  // console.log("body >> ", req.body);
  try {
    const findTicket = await TicketModal.findOne({ userId });
    if (findTicket) {
      return res
        .status(201)
        .json({ status: "You hace already registered in this event" });
    }
    await TicketModal.create({
      eventId: _id,
      userId,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      howDidHear,
    });
    return res.status(201).json({ status: "Registered Successfully" });
  } catch (error) {
    res.status(400).json({ status: "Server error", error: error });
  }
};

module.exports.getEvents = async (req, res) => {
  try {
    const all_events = await EventModel.find({});
    res.status(201).json(all_events);
  } catch (error) {
    res.status(400).json({ events: "Something went wrong" });
    console.log("getEvents error >>> ", error);
  }
};

module.exports.getMyEvents = async (req, res) => {
  const { _id } = req.params;
  try {
    // console.log("user Id >> ", _id);
    const userEvents = await EventModel.find({ eventCreator: _id });
    if (userEvents.length > 0) {
      return res.status(201).json(userEvents);
    } else {
      return res.json({ status: "No Events Created Yet" });
    }
  } catch (error) {
    res.status(400).json("Something went wrong.");
    console.log("getMyEvents error >> ", error);
  }
};

module.exports.deleteEvent = async (req, res) => {
  const { _id } = req.params;
  // console.log("delete event id >> ", _id);
  try {
    await EventModel.findByIdAndDelete({ _id });
    return res.status(201).json({ status: "Event Deleted" });
  } catch (error) {
    console.log("deleteEvent error >> ", error);
    return res.status(400).json({ status: "Something went wrong" });
  }
};
