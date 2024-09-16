const express = require('express')
const router = express.Router()
let meetings = require('../../data/meetings')

// Meetings paths
// Get all meetings
router.get('/', (req, res) => {
  res.json({ meetings })
})

// Get meeting by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const meeting = meetings.find((meet) => meet.id === id)

  res.json({ meeting })
})

// Delete meeting by ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const meeting = meetings.find((meet) => meet.id === id)
  meetings.splice(meetings.indexOf(meeting), 1)
  res.json({ meeting })
})

// Update meeting by ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const meeting = meetings.find((meet) => meet.id === id)
  meetings = meetings.map((meet) => {
    const { contactId } = meet
    if (meet.id === meeting.id) {
      return { ...req.body, id, contactId }
    } else return meet
  })
  res.status(201).json({ meeting })
})

module.exports = router
