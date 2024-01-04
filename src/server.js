const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");
const meetings = require("../data/meetings");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const findContactBy = (id, res) => {
  const foundContact = contacts.find((contact) => contact.id === id);
  if (!foundContact)
    return res.status(404).json(`No contact found with id ${id}.`);
  return foundContact;
};
const findMeetingBy = (id, res) => {
  const foundMeeting = meetings.find((meeting) => meeting.id === id);
  if (!foundMeeting)
    return res.status(404).json(`No meeting found with id ${id}.`);
  return foundMeeting;
};
const deleteMeetingsBy = (contactId) => {
  meetings.forEach((meeting) => {
    if (meeting.contactId === contactId) {
      const index = meetings.indexOf(meeting);
      meetings.splice(index, 1);
    }
  });
};
const getIdFromParams = (params) => {
  const { id } = params;
  const idNum = parseInt(id);
  return idNum;
};

// CORE
app.get("/contacts", (req, res) => {
  return res.json({ contacts: contacts });
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;

  newContact.id = contacts.length + 1;
  contacts.push(newContact);

  return res.status(201).json({ contact: newContact });
});

app.get("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id, res);

  return res.json({ contact: foundContact });
});

app.delete("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id, res);

  const index = contacts.indexOf(foundContact);
  contacts.splice(index, 1);
  deleteMeetingsBy(id);

  return res.json({ contact: foundContact });
});

app.put("/contacts/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundContact = findContactBy(id, res);

  const index = contacts.indexOf(foundContact);
  const updatedContact = req.body;

  if (
    !updatedContact.firstName ||
    !updatedContact.lastName ||
    !updatedContact.street ||
    !updatedContact.city ||
    !updatedContact.type ||
    !updatedContact.email ||
    !updatedContact.linkedin ||
    !updatedContact.twitter
  ) {
    return res.status(422).json("Cannot update - missing input");
  }

  updatedContact.id = id;
  contacts.splice(index, 1, updatedContact);

  return res.json({ contact: updatedContact });
});

// EXTENSION
app.get("/meetings", (req, res) => res.json({ meetings: meetings }));

app.get("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundMeeting = findMeetingBy(id, res);

  if (!foundMeeting)
    return res.status(404).json(`No meeting found with id ${id}.`);

  return res.json({ meeting: foundMeeting });
});

app.delete("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const foundMeeting = findMeetingBy(id, res);

  if (!foundMeeting)
    return res
      .status(404)
      .json(`No meeting found with id ${id} - could not delete.`);

  const index = meetings.indexOf(foundMeeting);
  meetings.splice(index, 1);

  return res.json({ meeting: foundMeeting });
});

app.put("/meetings/:id", (req, res) => {
  const id = getIdFromParams(req.params);
  const updatedMeeting = req.body;
  const foundMeeting = findMeetingBy(id, res);

  if (!foundMeeting)
    return res
      .status(404)
      .json(`No meeting found with id ${id} - could not update.`);

  foundMeeting.name = updatedMeeting.name

  return res.json({ meeting: foundMeeting });
});

app.get("/contacts/:id/meetings", (req, res) => {
  const contactId = getIdFromParams(req.params);
  
  // this originally was an if statement, but I then refactored the code to 
  // include that guard clause in the findContactBy() function itself.
  // Not sure whether it would be better to have left is as it was and have repetitions in the code, but have
  // very obvious guard clauses as if statements, or if it is fine to extract those into functions
  // even if the latter are sometimes called just for the sake of the guard clause they contain?
  findContactBy(contactId, res)

  const meetingsForContact = meetings.filter(
    (meeting) => meeting.contactId === contactId
  );

  if (!meetingsForContact)
    return res
      .status(404)
      .json(`No meetings found for contact with id ${contactId}.`);

  return res.json({ meetings: meetingsForContact });
});

app.post("/contacts/:id/meetings", (req, res) => {
  const id = meetings.length + 1;
  const contactId = getIdFromParams(req.params);

  findContactBy(contactId);
  const newMeeting = req.body;

  if (!newMeeting.name)
    return res
      .status(422)
      .json("Missing input name - could not add this meeting.");

  newMeeting.id = id;
  newMeeting.contactId = contactId;
  meetings.push(newMeeting);

  return res.status(201).json({ meeting: newMeeting });
});

module.exports = app;
