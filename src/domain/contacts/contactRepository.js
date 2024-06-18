const contactObj = [
  "firstName",
  "lastName",
  "street",
  "city",
  "type",
  "email",
  "linkedin",
  "twitter"
]
const meetingsObj = ["name"]

const verifyContactBody = (contact, res) => {
  for (const prop of contactObj) {
    if (contact[prop] === undefined) {
      return res.status(400).send({
        message: `${prop} is missing.`,
      })
    }
  }

  for (const prop in contact) {
    if (typeof contact[prop] !== "string") {
      return res.status(400).send({
        message: `${prop} needs to be a string.`,
      })
    }

    if (!contactObj.includes(prop)) {
      return res.status(400).send({
        message: `${prop} isn't a contact property.`,
      })
    }
  }
}

const pushData = (where, what) => {
  return where.push(what)
}

const findContactById = (contacts, id) => {
  return contacts.find((contact) => contact.id === id)
}

const findContactMeetings = (meetings, result) => {
  return meetings.filter((m) => m.contactId === result.id)
}

const deleteContactMeetings = (contactMeetings, meetings) => {
  return contactMeetings.forEach((meeting) => {
    meetings.splice(meetings.indexOf(meeting), 1)
  })
}

const removeContact = (contacts, result) => {
  return contacts.splice(contacts.indexOf(result), 1)
}

const foundContactId = (contacts, id) => {
  return contacts.find((c) => c.id === id)
}

const replaceUpdatedContact = (contacts, result, contactId) => {
  return contacts.splice(contacts.indexOf(result), 1, contactId)
}

const verifyResultFound = (result, res, id) => {
  if (!result) {
    return res.status(404).send({
      message: `contact with id of ${id} not found.`,
    })
  }
}

const verifyMeetingLength = (meeting, res, contact) => {
  if (meeting.length === 0) {
    return res.status(404).send({
      message: `${contact.firstName} ${contact.lastName} didn't have any meeting.`,
    })
  }
}

const verifyMeetingBody = (meeting, res) => {
  for (const prop of meetingsObj) {
    if (meeting[prop] === undefined) {
      return res.status(404).json({
        message: `${prop} is missing`,
      })
    }
  }

  for (const prop in meeting) {
    if (typeof meeting[prop] !== "string") {
      return res.status(404).json({
        message: `${prop} needs to be a string`,
      })
    }

    if (!meetingsObj.includes(prop)) {
      return res.status(404).json({
        message: `${prop} isn't a meeting property`,
      })
    }
  }
}

module.exports = {
  verifyContactBody,
  pushData,
  findContactById,
  findContactMeetings,
  deleteContactMeetings,
  removeContact,
  foundContactId,
  replaceUpdatedContact,
  verifyResultFound,
  verifyMeetingLength,
  verifyMeetingBody
}
