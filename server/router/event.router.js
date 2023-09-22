const express = require("express");
const mongoose = require("mongoose");
const EventModel = mongoose.model("Events");
const app = express();
const {
  // createEvent,
  getEvents,
  getEventDetails,
  getCategorizedEvents,
  bookTicket,
  getMyEvents,
  deleteEvent,
} = require("../controllers/eventController");
const router = express.Router();
const multer = require("multer");
app.use("/uploads", express.static("uploads"));
router.use(express.static(__dirname + "./public/"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
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

router.post("/createEvent", upload.single("eventImage"), async (req, res) => {
  const {
    eventCreator,
    eventTitle,
    discussionTopic,
    eventType,
    eventDate,
    eventTime,
    location,
    summary,
  } = req.body;
  const { filename } = req.file;
  // console.log("formData >> ", req.body);
  // console.log("eventImage >> ", filename);
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
      eventTime,
      eventImage: filename,
      location,
      summary,
    });
    res.status(201).send({ status: "Event created successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ status: "Something went wrong. Event could not be registered" });
    console.log("create event error >>> ", error);
  }
});

router.get("/getEvents", getEvents);
router.get("/getEventDetails/:_id", getEventDetails);
router.get("/:category", getCategorizedEvents);
router.post("/:_id/bookTicket", bookTicket);
router.get("/meEvents/:_id", getMyEvents);
router.delete("/deleteEvent/:_id", deleteEvent);

module.exports = router;
