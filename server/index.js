const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
require("./models/db/userSchema");
require("./models/db/eventSchema");
require("./models/db/ticketSchema");
app.use("/uploads", express.static("uploads"));
router.use(express.static(__dirname + "./public/"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const DB =
  "mongodb+srv://smshoaib2001:eventRegistration@cluster0.x3ikklh.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", require("./router/user.router"));
app.use("/api", require("./router/event.router"));

app.listen(2001, () => {
  console.log("Server running");
});
