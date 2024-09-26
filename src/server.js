const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { firstName } = require("../test/fixtures/contacts/createTestFormData");
const app = express();
const contacts = require("../data/contacts");
const meetings = require('../data/meetings.js')

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here

// Get all contacts
app.get("/contacts", (req, res) => {
  return res.send({ contacts });
});

// Create new contact
app.post("/contacts", (req, res) => {
  const newContact = req.body;
  newContact.id = contacts[contacts.length - 1].id + 1;
  contacts.push(newContact);
  return res.status(201).send({ contact: newContact });
});

// Get contact by ID
app.get("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((contact) => contact.id === Number(id));
  if (contact) {
    return res.send({ contact });
  } else {
    return res.send("No Contact Found");
  }
});

// Delete a contact by ID
app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((contact) => contact.id === id)
  const contactIndex = contacts.findIndex((item) => {
    return item === contact;
  });
  if (contact) {
    const deletedContact = contacts.splice(contactIndex, 1)[0];
    return res.send({ contact: deletedContact });
  } else {
    return res.send("No Contact Found");
  }
});


// Update a contact by ID
app.put("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const contact = contacts.find((contact) => {
      return contact.id === id;
    });
    const updateContact = {...body, id: id }
    const contactIndex = contacts.findIndex((item) => {
        return item === contact;
      });
    if (contact) {
        contacts.splice(contactIndex, 1, updateContact)
      return res.send({ contact: updateContact });
    }
    else {
      return res.send("No Contact Found");
    }
  });

// Get all meetings
app.get("/meetings", (req, res) => {
  return res.send({ meetings });
});

// Get a meeting by ID
app.get('/meetings/:id', (req, res) => {
  const id = Number(req.params.id)
  const meeting = meetings.find((meeting) => meeting.id === id)
  if (meeting) {
    return res.send({ meeting })
  } else {
    return res.status(404).send('No Meeting Found')
  }
})

// Delete a meeting by ID
app.delete('/meetings/:id', (req, res) => {
  const id = Number(req.params.id)
  const meeting = meetings.find((meeting) => meeting.id === id)
  const meetingIndex = meetings.findIndex((item) => item === meeting)
  if (meeting) {
    const deletedMeeting = meetings.splice(meetingIndex, 1)[0]
    return res.send({ meeting: deletedMeeting})
  } else {
    return res.send('Meeting not found')
  }
})

// Get meetings for a specific contact
app.get('/contacts/:id/meetings', (req, res) => {
  const contactId = req.params.id
  // const contactId = Number(req.params.id)
  const contactMeetings = meetings.filter((meeting) => meeting.contactId === contactId)
  if (contactMeetings) {
    return res.send({ meetings: contactMeetings })
  }
})

// Update meeting for a specific contact
app.put('/meetings/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body
  const updatedMeeting = {...body, id: id, contactId: id}
  const meetingIndex = meetings.findIndex((meeting) => meeting.id === id)
  if (updatedMeeting) {
    meetings.splice(meetingIndex, 1, updatedMeeting)
  return res.send({ meeting: updatedMeeting })
  }
})

module.exports = app;
