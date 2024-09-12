const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let id = 2;

const contacts = require("../data/contacts");

app.get("/contacts", (req, res) => {
  res.json({ contacts });
});

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((person) => person.id === id);
  res.json({ contact });
});

app.post("/contacts", (req, res) => {
  id++;
  const newContact = { ...req.body, id };
  contacts.push(newContact);
  res.status(201).json({ contact: newContact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = contacts.findIndex((person) => person.id === id);
  const contact = contacts.splice(index, 1)[0];
  res.json({ contact });
});

app.put("/contacts/:id", (req, res) => {
  const contact = contacts.find(
    (person) => person.id === Number(req.params.id)
  );
  console.log("updated", contact);
  const updatedContact = { ...contact, ...req.body };
  contacts[contacts.indexOf(contact)] = updatedContact;

  console.log("req.body", req.body);

  res.send({ contact: updatedContact });
});

module.exports = app;
