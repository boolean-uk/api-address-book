const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts.js");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let nextContact = 3;

app.get("/contacts", function (req, res) {
  res.json({
    contacts: contacts,
  });
});

app.get("/contacts/:id", function (req, res) {
  const contact = contacts.find((con) => con.id == req.params.id);

  contact !== undefined
    ? res.json({ contact: contact })
    : res.status(404).json("Not Found");
});

app.post("/contacts", function (req, res) {
  const contact = req.body;
  contact.id = nextContact;
  contacts.push(contact);
  res.status(201).json({ contact });
  nextContact++;
});

app.delete("/contacts/:id", function (req, res) {
  const contact = contacts.find((con) => con.id == req.params.id);
  if (contact) {
    const index = contacts.findIndex((obj) => obj == contact);
    contacts.splice(index, 1);
    res.json({ contact: contact });
  } else {
    res.status(404).json("Contact Not Found");
  }
});

app.put("/contacts/:id", function (req, res) {
  const contact = contacts.find((con) => con.id == req.params.id);
  if (contact) {
    const index = contacts.findIndex((obj) => obj == contact);
    const newContact = req.body;
    newContact.id = contact.id;
    contacts[index] = newContact;
    res.json({ contact: newContact });
  } else {
    res.status(404).json("Contact Not Found");
  }
});

module.exports = app;
