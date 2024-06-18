const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const contacts = require("../data/contacts");
const meetings = require("../data/meetings");

// 1- Contacts
// a) Helper functions
function findContact(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact)
    return res.status(404).send(`The contact with ID ${id} is not found.`);

  return contact;
}

function validateContact(req, res) {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    type: Joi.string().required(),
    email: Joi.string().required(),
    linkedin: Joi.string().required(),
    twitter: Joi.string().required(),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

// b) API verbs
app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  validateContact(req, res);

  const id = contacts[contacts.length - 1].id + 1;
  const contact = Object.assign({ id }, req.body);

  contacts.push(contact);
  res.status(201).json({ contact });
});

app.get("/contacts/:id", (req, res) => {
  const contact = findContact(req, res);

  res.status(200).json({ contact });
});

app.delete("/contacts/:id", (req, res) => {
  const contact = findContact(req, res);

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);

  for (let key of meetings) {
    if (key?.contactId === contact.id) {
      meetings.splice(meetings.indexOf(key), 1);
    }
  }

  res.status(200).json({ contact });
});

app.put("/contacts/:id", (req, res) => {
  const contact = findContact(req, res);

  validateContact(req, res);

  contacts[contacts.indexOf(contact)] = { ...contact, ...req.body };

  res.status(200).json({ contact: { ...contact, ...req.body } });
});

// 2- Meetings
// a) Helper functions
function findMeeting(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const meeting = meetings.find((meeting) => meeting.id === id);

  if (!meeting)
    return res.status(404).send(`The meeting with ID ${id} is not found.`);

  return meeting;
}

function validateMeeting(req, res) {
  const schema = {
    name: Joi.string().required(),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(error.details[0].message);
}

// b) API verbs
app.get("/meetings", (req, res) => {
  res.status(200).json({ meetings });
});

app.get("/meetings/:id", (req, res) => {
  const meeting = findMeeting(req, res);

  res.status(200).json({ meeting });
});

app.delete("/meetings/:id", (req, res) => {
  const meeting = findMeeting(req, res);

  const index = meetings.indexOf(meeting);

  meetings.splice(index, 1);
  res.status(200).json({ meeting });
});

app.put("/meetings/:id", (req, res) => {
  const meeting = findMeeting(req, res);

  validateMeeting(req, res);

  meeting.name = req.body.name;
  res.status(200).json({ meeting });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId === findContact(req, res).id
  );

  if (!contactMeetings)
    return res.status(404).send(`No meetings found for this contact.`);

  res.status(200).json({ meetings: contactMeetings });
});

app.post("/contacts/:id/meetings", (req, res) => {
  validateMeeting(req, res);

  const meetingId = meetings[meetings.length - 1].id + 1;
  const contactId = Number.parseInt(req.params.id, 10);

  const newMeeting = Object.assign({ id: meetingId, contactId }, req.body);

  meetings.push(newMeeting);

  res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
