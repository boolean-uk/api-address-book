const contacts = require("../../../data/contacts.js")
const meetings = require("../../../data/meetings.js")
const {
  verifyContactBody,
  findContactById,
  findContactMeetings,
  deleteContactMeetings,
  removeContact,
  foundContactId,
  replaceUpdatedContact,
  verifyResultFound,
  verifyMeetingLength,
  verifyMeetingBody,
  pushData
} = require("../../domain/contacts/contactRepository.js")

const getAllContacts = (req, res) => {
  res.json({
    contacts: contacts,
  })
}

const createContact = (req, res) => {
  const contact = req.body

  verifyContactBody(contact, res)

  const contactId = { id: contacts.length + 1, ...contact }

  pushData(contacts, contactId)

  res.status(201).json({
    contact: contactId,
  })
}

const getContactById = (req, res) => {
  const id = Number(req.params.id)
  const result = findContactById(contacts, id)

  verifyResultFound(result, res, id)

  res.json({
    contact: result,
  })
}

const deleteContact = (req, res) => {
  const id = Number(req.params.id)
  const result = findContactById(contacts, id)
  const contactMeetings = findContactMeetings(meetings, result)

  verifyResultFound(result, res, id)

  deleteContactMeetings(contactMeetings, meetings, result)

  removeContact(contacts, result)

  res.json({
    contact: result,
  })
}

const updateContact = (req, res) => {
  const contact = req.body
  const id = Number(req.params.id)
  const result = foundContactId(contacts, id)

  verifyResultFound(result, res, id)

  verifyContactBody(contact, res)

  const contactId = { id: result.id, ...contact }

  replaceUpdatedContact(contacts, result, contactId)

  res.json({
    contact: contactId,
  })
}

const getContactMeetings = (req, res) => {
  const id = Number(req.params.id)
  const contact = foundContactId(contacts, id)

  verifyResultFound(contact, res, id)

  const meeting = findContactMeetings(meetings, contact)

  verifyMeetingLength(meeting, res, contact)

  res.json({
    meetings: meeting,
  })
}

const createContactMeeting = (req, res) => {
  const id = Number(req.params.id)
  const contact = foundContactId(contacts, id)
  const meeting = req.body

  verifyResultFound(contact, res, id)

  verifyMeetingBody(meeting, res)

  const meetingIDs = {
    ...meeting,
    contactId: contact.id,
    id: meetings.length + 1,
  }

  pushData(meetings, meetingIDs)

  res.status(201).json({
    meeting: meetingIDs,
  })
}

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  deleteContact,
  updateContact,
  getContactMeetings,
  createContactMeeting
}
