const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
let contacts = require("../data/contacts");
let meetings = require("../data/meetings");
const { query } = require("express");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

//GET: All data
app.get("/contacts", (req, res) => {
  res.json({ contacts: contacts });
});

// GET: get data by id

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((singleContact) => singleContact.id === id);

  res.json({ contact });
});

// POST: creating a new contact and adding it to the initial contact data
app.post("/contacts", (req, res) => {
  let id;
  if (contacts.length === 0) {
    id = 1;
  } else {
    id = contacts[contacts.length - 1].id + 1;
  }

  const newContact = { ...req.body, id };
  contacts.push(newContact);
  res.status(200).json({ contact: newContact });
});

// DELETE: contact by id
app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((singleContact) => singleContact.id === id);
  contacts.splice(contacts.indexOf(contact), 1);
  res.json({ contact });
});

// PUT: changing an entire contact by contact id.
app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((singleContact) => singleContact.id === id);
  // contacts = contacts.map((singleContact) => {
  //   if (singleContact.id === contact.id) {
  //     return { ...req.body, id };
  //   } else return singleContact;
  // });

  // to pass the test code has been modified below as
  // for each key, overwrite the contact object key of the same name with the value of the request body (by key)

  Object.keys(req.body).forEach((prop) => (contact[prop] = req.body[prop]));
  res.status(200).json({ contact: contact });
});

// Meetings paths
// Get all meetings
app.get("/meetings", (req, res) => {
  res.json({ meetings });
});

// Get meeting by ID
app.get("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meet) => meet.id === id);

  res.json({ meeting: meeting });
});

// Delete meeting by ID
app.delete("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meet) => meet.id === id);
  meetings.splice(meetings.indexOf(meeting), 1);
  res.json({ meeting: meeting });
});

// Update meeting by ID
app.put("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meet) => meet.id === id);
  meeting.name = req.body.name;
  meeting.contactId = Number(meeting.contactId);
  res.json({ meeting: meeting });
});

// Get meetings for a specific contact
app.get("/contacts/:id/meetings", (req, res) => {
  const contactId = req.params.id;
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId === contactId
  );
  res.json({ meetings: contactMeetings });
});

// POST :Create a meeting for a contact
app.post("/contacts/:id/meetings", (req, res) => {
  let id;

  if (meetings.length === 0) {
    id = 1;
  } else {
    id = meetings[meetings.length - 1].id + 1;
  }
  let contactId = Number(req.params.id);
  let meeting = meetings.filter((meetings) => meetings.contactId === contactId);
  meeting = { ...req.body, contactId, id };
  // const newContact = { ...req.body, id };
  meetings.push(meeting);
  res.status(200).json({ meeting: meeting });
});

module.exports = app;
