const express = require("express");
const router = express.Router();
const contacts = require("../../data/contacts.js");
const meetings = require("../../data/meetings.js");
//get all contacts
router.get("/", (req, res) => {
  res.json({ contacts: contacts });
});
//get contact by id
router.get("/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  res.json({ contact: contact });
});
//create a contact
router.post("/", (req, res) => {
  const contact = { ...req.body, id: contacts.length + 1 };
  contacts.push(contact);
  res.json({ contact: contact });
});

//delete a contact
router.delete("/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  const index = contacts.indexOf(contact);
  const updatedMeetings = meetings.filter(
    (meeting) => meeting.contactId === Number(req.params.id)
  );
  meetings.splice(0, meetings.length);
  meetings.push(updatedMeetings);

  contacts.splice(index, 1);
  res.json({ contact: contact });
});
//update a contact
router.put("/:id", (req, res) => {
  const contact = contacts.find((item) => item.id === Number(req.params.id));
  // get keys of the req body in the array
  //for each key, overwrite the contact object key of the same name with the value of the request body (by key)

  Object.keys(req.body).forEach((prop) => (contact[prop] = req.body[prop]));
  res.json({ contact: contact });
});
//get meetings for specific contact
router.get("/:id/meetings", (req, res) => {
  const contactMeetings = meetings.filter(
    (meeting) => meeting.contactId === req.params.id
  );
  res.json({ meetings: contactMeetings });
});

router.post("/:id/meetings", (req, res) => {
  const meeting = {
    ...req.body,
    id: meetings.length + 1,
    contactId: req.params.id,
  };
  // meeting.contactId = Number(meeting.contactId);
  meetings.push(meeting);
  res.json({ meeting: meeting });
});
module.exports = router;
