const express = require('express')
const router = express.Router()
let contacts = require('../../data/contacts')
let meetings = require('../../data/meetings')

//GET: All data
router.get('/', (req, res) => {
  res.json({ contacts: contacts })
})

// GET: get data by id

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)

  res.json({ contact })
})

// POST: creating a new contact and adding it to the initial contact data
router.post('/', (req, res) => {
  let id
  if (contacts.length === 0) {
    id = 1
  } else {
    id = contacts[contacts.length - 1].id + 1
  }

  const newContact = { ...req.body, id }
  contacts.push(newContact)
  res.status(200).json({ contact: newContact })
})

// DELETE: contact by id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)
  contacts.splice(contacts.indexOf(contact), 1)
  res.json({ contact })
})

// PUT: changing an entire contact by contact id.
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find((singleContact) => singleContact.id === id)
  // contacts = contacts.map((singleContact) => {
  //   if (singleContact.id === contact.id) {
  //     return { ...req.body, id }
  //   } else return singleContact
  // })
  // see above : The code was causing a failure. see below for solution.
  Object.keys(req.body).forEach((prop) => (contact[prop] = req.body[prop]))
  res.json({ contact: contact })
})

// GET
// Get meetings for a specific contact
router.get('/:id/meetings', (req, res) => {
  const contactId = req.params.id
  const ctMeetings = meetings.filter(
    (meeting) => meeting.contactId === contactId
  )
  res.json(ctMeetings)
})

module.exports = router
