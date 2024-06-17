const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
let contacts = require("../data/contacts.js")
let meetings = require('../data/meetings.js')

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let newContactId = contacts.length + 1
let newMeetingId = meetings.length + 1


// Retrieve a list of contacts
app.get("/contacts", (req, res) => {
	res.status(200).json({ contacts })
})


// Create a contact
app.post("/contacts", (req, res) => {
	const contact = req.body
	contact.id = newContactId
	newContactId += 1
	contacts.push(contact)

	res.status(201).json({ contact })
})


// Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const contact = contacts.find((c) => c.id === contactId)
	res.status(200).json({ contact: contact })
})


// Delete a single contact by ID
app.delete("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const contact = contacts.find((c) => c.id === contactId)
	// contacts.splice(contactId, 1)
    contacts = contacts.filter((c) => c.id !== contactId)
    
    meetings = meetings.filter(m => m.contactId !== contactId)

	res.status(200).json({ contact })
})


// Update a contact by ID
app.put("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const updatedContact = req.body
	updatedContact.id = contactId
	contacts.splice(contactId - 1, 1, updatedContact)
	res.status(200).json({ 'contact': updatedContact })
})


// Meetings

// Retrieve a list of all meetings
app.get("/meetings", (req, res) => {
	res.status(200).json({ meetings })
})


// Get a meeting by id
app.get("/meetings/:id", (req, res) => {
	const meetingId = Number(req.params.id)
	const meeting = meetings.find((m) => m.id === meetingId)
	res.status(200).json({ meeting: meeting })
})


// Delete a meeting by id
app.delete("/meetings/:id", (req, res) => {
	const meetingId = Number(req.params.id)
	const meeting = meetings.find((c) => c.id === meetingId)
	// meetings.splice(meetingId, 1)
	meetings = meetings.filter((c) => c.id !== meetingId)
	res.status(200).json({ meeting })
})

// Update a meeting for a contact
app.put('/meetings/:id', (req, res) => {
    const newMeeting = req.body
    const paramId = Number(req.params.id)
    const meetingToUpdate = meetings.find(m => m.contactId === paramId)

    newMeeting.id = meetingToUpdate.id
    newMeeting.contactId = paramId

    const meetingToUpdateIndex = meetings.indexOf(meetingToUpdate)
    meetings.splice(meetingToUpdateIndex, 1, newMeeting)

    res.status(200).json({meeting: newMeeting})
})

// Get meetings for a specific contact
app.get('/contacts/:id/meetings', (req, res) => {
    const paramId = Number(req.params.id)

    const meetingsToShow = meetings.filter(m => m.contactId === paramId)

    res.status(200).json({'meetings': meetingsToShow})
})


// Create a meeting for a contact
app.post('/contacts/:id/meetings', (req, res) => {
	const paramId = Number(req.params.id)
	const newMeetingName = req.body.name

	const meeting = {
		name: newMeetingName,
		contactId: Number(paramId),
		id: newMeetingId,
	}
	newMeetingId += 1

	meetings.push(meeting)

	res.status(201).json({ meeting })
})



module.exports = app
