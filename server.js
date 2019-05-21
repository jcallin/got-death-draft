const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const path = require("path");
require("dotenv").config();

const port = 80;
const app = express();
app.use(cors());

const mongoPassword = process.env.MONGO_PASSWORD;

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

// ****** Client Route *******
// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// ****** Db Route *******
// this is our create methid
// this method adds new data in our database
app.post("/api/putData", (req, res) => {
  let data = new Data();
  console.log(`Received request: ${req.body}`);

  const { name, dead, throne } = req.body;

  if ((!name && name !== 0) || !dead) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.name = name;
  data.dead = dead;
  data.throne = throne;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
