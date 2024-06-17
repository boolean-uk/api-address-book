const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts.js");

app.get("/contacts", (req, res) => {
  res.json({
    contacts,
  });
});
app.get("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const findContact = contacts.find((contact) => contact.id === contactId);
  res.status(200).json({ contact: findContact });
});
app.post("/contacts", (req, res) => {
  const contact = req.body;
  contact.id = 3;
  contacts.push(contact);
  res.status(201).json({ contact });
});
app.put("/contacts/:id", (req, res) => {
  const newContact = req.body;
  const contactID = Number(req.params.id);
  const foundContact = contacts.find((contact) => contact.id === contactID);
  const foundContactIndex = contacts.indexOf(foundContact);

  newContact.id = contactID;

  contacts.splice(foundContactIndex, 1, newContact);

  res.json({ contact: newContact });
});
app.delete("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  const deletedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  res.json({ contact: deletedContact });
});

module.exports = app;
