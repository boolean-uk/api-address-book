const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts");
app.get("/contacts", (req, res) => {
  res.send({ contacts: contacts });
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.send({ contact });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts[contacts.length - 1].id + 1;
  contacts.push(newContact);
  res.status(201).send({ contact: newContact });
});

app.delete("/contacts/:id", (req, res) => {
  const contactIndex = contacts.findIndex(
    (contact) => contact.id == req.params.id
  );
  const removedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  res.send({ contact: removedContact });
});

app.put("/contacts/:id", (req, res) => {
  const updateContact = req.body;
  const contactIndex = contacts.findIndex(
    (contact) => contact.id == req.params.id
  );
  updateContact.id = contacts[contactIndex].id;
  contacts.splice(contactIndex, 1, updateContact);
  res.send({ contact: updateContact });
});
module.exports = app;
