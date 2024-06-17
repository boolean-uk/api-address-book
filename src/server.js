const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contacts = require("../data/contacts.js");
const meetings = require('../data/meetings.js')
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//CONTACTS RES/REQ

app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts });
});

app.post("/contacts", (req, res) => {
  const contact = req.body;
  contact.id = contacts.length + 1;
  contacts.push(contact);
  res.status(201).json({ contact });
});

app.get("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) {
    return res.status(404).json({ error: "No contact with that ID" });
  }
  res.status(200).json({ contact });
});

app.delete("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const contact = contacts.find((contact) => contact.id === Number(contactId));
  if (!contact) {
    return res.status(404).json({ error: "No contact with that ID" });
  }
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  res.status(200).json({ contact });
});

app.put("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const updatedProperties = req.body;
  let contact = contacts.find((contact) => contact.id === Number(contactId));

  if (!contact) {
    return res.status(404).json({ error: "No contact with that ID" });
  }

  Object.assign(contact, updatedProperties);
  res.status(200).json({ contact });
});

//MEETINGS RES/REQ

app.get("/meetings", (req, res) => {
    res.status(200).json({ meetings });
})

app.get("/meetings/:id", (req, res) => {
    const meetingId = req.params.id;
    const meeting = meetings.find((meeting) => meeting.id === Number(meetingId));
    if (!meeting) {
      return res.status(404).json({ error: "No contact with that ID" });
    }
    res.status(200).json({ meeting });
  });

module.exports = app;
