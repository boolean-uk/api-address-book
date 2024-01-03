const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const importedContacts = require("../data/contacts");
console.log(importedContacts); // Check what's being imported
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let contacts = importedContacts; // Initialize contacts with imported data

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World!!" });
});

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

app.get("/contacts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    res.json(contact);
});

module.exports = app;
