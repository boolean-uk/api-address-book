const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
let contacts = require("../data/contacts");
let newContactId = 2;
let meetings = require("../data/meetings");
let newMeetingId = 3;

app.get("/contacts", function (req, res) {
  res.status(200).json({ contacts });
});

app.post("/contacts", function (req, res) {
  const contact = req.body;
  if (!contact.firstName) {
    return res.status(400).json({ error: "Contact information is required" });
  }

  newContactId += 1;
  contact.id = newContactId;

  contacts.push(contact);
  res.status(201).json({ contact });
});

app.get("/contacts/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundContact = contacts.find((contact) => contact.id === id);

  if (foundContact) {
    res.status(200).json({ contact: foundContact });
  } else {
    res.status(404).json({ error: "Contact Not Found" });
  }
});

app.delete("/contacts/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundContact = contacts.find((contact) => contact.id === id);
  const foundMeetings = [];

  meetings.forEach((meeting) => {
    if (meeting.contactId === id) {
      foundMeetings.push(meeting);
    } else {
      console.log("Meeting not a match");
    }
  });

  if (foundContact) {
    contacts = contacts.filter((contact) => contact.id !== foundContact.id);
    let existingMeetingIndex = null;

    if (foundMeetings) {
      foundMeetings.forEach((meeting) => {
        existingMeetingIndex = meetings.findIndex(
          (meeting) => meeting.contactId === id
        );

        meetings.splice(existingMeetingIndex, 1);
      });
    }
    res.status(200).json({ contact: foundContact });
  } else {
    res.status(404).json({ error: "Contact Not Found" });
  }
});

app.put("/contacts/:id", function (req, res) {
  const updatedContact = req.body;
  const id = Number(req.params.id);

  const existingContactIndex = contacts.findIndex(
    (contact) => contact.id === id
  );

  updatedContact.id = id;

  contacts.splice(existingContactIndex, 1, updatedContact);

  res.status(200).json({ contact: updatedContact });
});

app.get("/meetings", function (req, res) {
  res.status(200).json({ meetings });
});

app.get("/meetings/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundMeeting = meetings.find((meeting) => meeting.id === id);

  if (foundMeeting) {
    res.status(200).json({ meeting: foundMeeting });
  } else {
    res.status(404).json({ error: "Meeting Not Found" });
  }
});

app.delete("/meetings/:id", function (req, res) {
  const id = Number(req.params.id);

  const foundMeeting = meetings.find((meeting) => meeting.id === id);

  if (foundMeeting) {
    meetings = meetings.filter((meeting) => meeting.id !== foundMeeting.id);

    res.status(200).json({ meeting: foundMeeting });
  } else {
    res.status(404).json({ error: "Meeting Not Found" });
  }
});

app.put("/meetings/:id", function (req, res) {
  const updatedMeeting = req.body;
  const id = Number(req.params.id);
  const foundMeeting = meetings.find((meeting) => meeting.id === id);

  const existingMeetingIndex = meetings.findIndex(
    (meeting) => meeting.id === foundMeeting.id
  );

  updatedMeeting.id = id;
  updatedMeeting.contactId = foundMeeting.contactId;

  meetings.splice(existingMeetingIndex, 1, updatedMeeting);

  res.status(200).json({ meeting: updatedMeeting });
});

app.get("/contacts/:id/meetings", function (req, res) {
  const id = Number(req.params.id);
  const foundMeetings = [];

  meetings.forEach((meeting) => {
    if (meeting.contactId === id) {
      foundMeetings.push(meeting);
    } else {
      console.log("Meeting not a match");
    }
  });

  if (foundMeetings.length >= 1) {
    res.status(200).json({ meetings: foundMeetings });
  } else {
    res.status(404).json({ error: "Meetings Not Found" });
  }
});

app.post("/contacts/:id/meetings", (req, res) => {
  const newMeeting = req.body;
  const id = Number(req.params.id);

  if (!newMeeting.name) {
    return res.status(400).json({ error: "Meeting information is required" });
  }

  newMeetingId += 1;
  newMeeting.id = newMeetingId;
  newMeeting.contactId = id;

  meetings.push(newMeeting);
  res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
