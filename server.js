const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const path = require("path");

const port = 80;
const app = express();
app.use(cors());
const router = express.Router();

var mongoPassword = process.env.MONGO_PASSWORD;

// DB setup
const dbUri = `mongodb+srv://jcallin:${mongoPassword}@got-death-draft-db-myote.mongodb.net/got-death-draft?retryWrites=true`;

// connects our back end code with the database
mongoose.connect(dbUri, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// ****** Client Route *********
// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// ****** Db Route
// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();
  console.log(`Received request: ${req.body}`);

  const { name, dead } = req.body;

  if ((!name && name !== 0) || !dead) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.dead = dead;
  data.name = name;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
