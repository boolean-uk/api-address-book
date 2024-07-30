const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let contacts = require("../data/contacts");
let newContactId = 2;
let meetings = require("../data/meetings")

app.get("/contacts", function (req, res) {
  res.status(200).json({ contacts });
});

app.post("/contacts", function (req, res) {
  const contact = req.body;
  if (!contact.firstName) {
    return res.status(400).json({ error: "Contact information is required" });
  }

  newContactId += 1;
  contact.id = newContactId;

  contacts.push(contact);
  res.status(201).json({ contact });
});

app.get("/contacts/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundContact = contacts.find((contact) => contact.id === id);

  if (foundContact) {
    res.status(200).json({ contact: foundContact });
  } else {
    res.status(404).json({ error: "Contact Not Found" });
  }
});

app.delete("/contacts/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundContact = contacts.find((contact) => contact.id === id);

  if (foundContact) {
    contacts = contacts.filter((contact) => contact.id !== foundContact.id);

    res.status(200).json({ contact: foundContact });
  } else {
    res.status(404).json({ error: "Contact Not Found" });
  }
});

app.put("/contacts/:id", function (req, res) {
  const updatedContact = req.body;
  const id = Number(req.params.id);

  const existingContactIndex = contacts.findIndex(
    (contact) => contact.id === id
  );

  updatedContact.id = id;

  contacts.splice(existingContactIndex, 1, updatedContact);

  res.status(200).json({ contact: updatedContact });
});




module.exports = app;
