const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
let contacts = require("../data/contacts.js");
let meetings = require("../data/meetings.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

app.get("/contacts", function (req, res) {
  res.status(200).json({ contacts: contacts });
});

app.post("/contacts", function (req, res) {
  const postContact = req.body;
  const currentHighId = contacts.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
  postContact.id = currentHighId + 1;
  contacts.push(postContact);
  res.status(200).json({ contacts: contacts });
});

app.get("/contacts/:id", function (req, res) {
  const toFind = parseInt(req.params.id, 10);
  const index = contacts.findIndex((obj) => obj.id === toFind);
  const foundContact = contacts[index];
  if (foundContact) {
    res.send({ contact: foundContact });
  } else {
    res.sendStatus(404);
  }
});

app.delete("/contacts/:id", function (req, res) {
  const toRemove = parseInt(req.params.id, 10);
  updated = contacts.filter((obj) => obj.id !== toRemove);
  contacts = updated;
  res.status(200).json({ contacts: contacts });
});

module.exports = app;
