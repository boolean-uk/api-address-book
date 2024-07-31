const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

const contacts = require("../data/contacts");
const meetings = require("../data/meetings");

// Set initial value for next IDs based on the existing contacts and meetings
let nextContactId =
  contacts.reduce((max, contact) => (contact.id > max ? contact.id : max), 0) +
  1;
let nextMeetingId =
  meetings.reduce((max, meeting) => (meeting.id > max ? meeting.id : max), 0) +
  1;

// Contacts Routes
app.get("/contacts", (req, res) => {
  res.status(200).json({ contacts });
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (contact) {
    res.status(200).json({ contact });
  } else {
    res.status(404).send("Contact not found");
  }
});

app.post("/contacts", (req, res) => {
  const contact = req.body;
  contact.id = nextContactId;
  nextContactId += 1; // increment next contact id

  contacts.push(contact);
  res.status(201).json({ contact });
});

app.put("/contacts/:id", (req, res) => {
  const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...req.body };
    res.status(200).json({ contact: contacts[index] });
  } else {
    res.status(404).send("Contact not found");
  }
});

app.delete("/contacts/:id", (req, res) => {
  const contactIndex = contacts.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (contactIndex !== -1) {
    const deletedContact = contacts.splice(contactIndex, 1)[0];
    // Remove all meetings associated with the deleted contact
    const remainingMeetings = meetings.filter(
      (meeting) => meeting.contactId !== deletedContact.id
    );
    meetings.length = 0; // Clear the array
    meetings.push(...remainingMeetings); // Add remaining meetings back

    res.status(200).json({ contact: deletedContact });
  } else {
    res.status(404).send("Contact not found");
  }
});

// Meetings Routes
app.get("/meetings", (req, res) => {
  res.status(200).json({ meetings });
});

app.get("/meetings/:id", (req, res) => {
  const meeting = meetings.find((m) => m.id === parseInt(req.params.id));
  if (meeting) {
    res.status(200).json({ meeting });
  } else {
    res.status(404).send("Meeting not found");
  }
});

app.get("/contacts/:id/meetings", (req, res) => {
  const contactMeetings = meetings.filter(
    (m) => m.contactId === parseInt(req.params.id)
  );
  res.status(200).json({ meetings: contactMeetings });
});

app.post("/contacts/:id/meetings", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (contact) {
    const meeting = req.body;
    meeting.id = nextMeetingId;
    meeting.contactId = contact.id;
    nextMeetingId += 1; // increment next meeting id

    meetings.push(meeting);
    res.status(201).json({ meeting });
  } else {
    res.status(404).send("Contact not found");
  }
});

app.put("/meetings/:id", (req, res) => {
  const index = meetings.findIndex((m) => m.id === parseInt(req.params.id));
  if (index !== -1) {
    meetings[index] = { ...meetings[index], ...req.body };
    res.status(200).json({ meeting: meetings[index] });
  } else {
    res.status(404).send("Meeting not found");
  }
});

app.delete("/meetings/:id", (req, res) => {
  const index = meetings.findIndex((m) => m.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedMeeting = meetings.splice(index, 1)[0];
    res.status(200).json({ meeting: deletedMeeting });
  } else {
    res.status(404).send("Meeting not found");
  }
});

module.exports = app;
