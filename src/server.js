const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
let contacts = require("../data/contacts");
let meetings = require("../data/meetings");

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
  const contact = contacts.find((contact) => {
    return contact.id === id;
  });
  const contactIndex = contacts.findIndex((item) => {
    return item === contact;
  });
  if (contact) {
    const deletedContact = contacts.splice(contactIndex, 1)[0];

    // Delete meetings with the same contact ID

    const deletedMeetings = meetings.filter((meeting) => {
      return meeting.contactId === id.toString();
    });
    meetings = meetings.filter((meeting) => {
      return meeting.contactId !== id.toString()
    });
    return res.send({ contact: deletedContact, meetings });
  } else {
    return res.send("No Meetings Found");
  }
});

// Edit a contact by ID
app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const contact = contacts.find((contact) => {
    return contact.id === id;
  });
  const updateContact = { ...body, id: id };
  const contactIndex = contacts.findIndex((item) => {
    return item === contact;
  });
  if (contact) {
    contacts.splice(contactIndex, 1, updateContact);
    return res.send({ contact: updateContact });
  } else {
    return res.send("No Contact Found");
  }
});


// Get all meetings
app.get("/meetings", (req, res) => {
  return res.send({ meetings });
});

// Get meeting by ID
app.get("/meetings/:id", (req, res) => {
  const id = req.params.id;
  let meeting = meetings.find((meeting) => meeting.id === Number(id));
  if (meeting) {
    return res.send({ meeting });
  } else {
    return res.send("No Meeting Found");
  }
});

// Delete a meeting by ID
app.delete("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);
  const meeting = meetings.find((meeting) => {
    return meeting.id === id;
  });
  const meetingIndex = meetings.findIndex((item) => {
    return item === meeting;
  });
  if (meeting) {
    const deletedMeet = meetings.splice(meetingIndex, 1)[0];
    return res.send({ meeting: deletedMeet });
  } else {
    return res.send("No Meeting Found");
  }
});

// Edit a meeting by ID
app.put("/meetings/:id", (req, res) => {
  const id = Number(req.params.id);

  const meeting = meetings.find((meeting) => {
    return meeting.id === id;
  });

  if (meeting) {
    meeting.name = req.body.name;
    return res.send({ meeting: meeting });
  }
});

app.get('/contacts/:id/meetings', (req, res) => {
  const contactMeetings = []
  const id = req.params.id

  for (i = 0; i < meetings.length; i++) {
    if (meetings[i].contactId === id) {
      contactMeetings.push(meetings[i])
    }
  }

  return res.send({ meetings: contactMeetings })
})

app.post('/contacts/:id/meetings', (req, res) => {
  const contactId = req.params.id
  const newMeeting = {
    contactId: contactId,
    name: req.body.name
  }

  newMeeting.id = meetings[meetings.length - 1].id + 1;
  meetings.push(newMeeting)
  return res.status(201).send({ meeting: newMeeting })
})

module.exports = app;
