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
  const { firstName, lastName, street, city, type, email, linkedin, twitter } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !street ||
    !city ||
    !type ||
    !email ||
    !linkedin ||
    !twitter
  ) {
    return res.status(400);
  }
  const currentHighId = contacts.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
  req.body.id = currentHighId + 1;
  contacts.push(req.body);
  res.status(201).json({ contact: req.body });
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
  const contactIndex = contacts.findIndex((obj) => obj.id === toRemove);
  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const deletedContact = contacts[contactIndex];
  contacts = contacts.filter((obj) => obj.id !== toRemove);

  res.status(200).json({ contact: deletedContact });
});

app.put("/contacts/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const { firstName, lastName, street, city, type, email, linkedin, twitter } =
    req.body;
  const updatedContact = {
    ...contacts[contactIndex],
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter,
  };
  contacts[contactIndex] = updatedContact;

  res.status(200).json({ contact: updatedContact });
});

module.exports = app;
