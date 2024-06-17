const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

let contacts = require("../data/contacts.js")
let meetings = require("../data/meetings.js")

let idCounter = 3
let meetingIdCounter = 4

app.get('/contacts', (req, res) => {
    res.json({
        contacts
    })
})

app.post('/contacts', (req, res) => {
    const contact = req.body

    if(!verifyContactProperties(contact)) {
        return res.status(400).json({message: 'invalid body'})
    }

    contact.id = idCounter
    contacts.push(contact)

    idCounter++

    res.status(201).json({contact})
})

app.get('/contacts/:id', (req, res) => {
    const contactID = Number(req.params.id)
    const foundContact = contacts.find((contact) => contact.id === contactID)

    res.json({contact: foundContact})
})

app.delete('/contacts/:id', (req, res) => {
    const contactID = Number(req.params.id)
    const foundContact = contacts.find((contact) => contact.id === contactID)

    contacts = contacts.filter((contact) => contact.id !== contactID)

    meetings = meetings.filter((meeting) => meeting.contactId !== contactID)

    res.json({contact: foundContact})
})

app.put('/contacts/:id', (req, res) => {
    const newContactInfo = req.body
    const contactID = Number(req.params.id)

    if(!verifyContactProperties(newContactInfo)) {
        return res.status(400).json({message: 'invalid body'})
    }

    const foundContact = contacts.find((contact) => contact.id === contactID)
    const foundContactIndex = contacts.indexOf(foundContact)
    
    newContactInfo.id = contactID

    contacts.splice(foundContactIndex, 1, newContactInfo)

    res.json({contact: newContactInfo})
})

app.get('/meetings', (req, res) => {
    res.json({meetings})
})

app.get('/meetings/:id', (req, res) => {
    const meetingID = Number(req.params.id)
    const foundMeeting = meetings.find((meeting) => meeting.id === meetingID)

    res.json({meeting: foundMeeting})
})

app.delete('/meetings/:id', (req, res) => {
    const meetingID = Number(req.params.id)
    const foundMeeting = meetings.find((meeting) => meeting.id === meetingID)

    meetings = meetings.filter((meeting) => meeting.id !== meetingID)

    res.json({meeting: foundMeeting})
})

app.put('/meetings/:id', (req, res) => {
    const newMeetingInfo = req.body
    const contactID = Number(req.params.id)

    if(!verifyMeetingProperties(newMeetingInfo)) {
        return res.status(400).json({message: 'invalid body'})
    }

    const foundMeeting = meetings.find((meeting) => meeting.contactId === contactID)
    const foundMeetingIndex = meetings.indexOf(foundMeeting)
    
    newMeetingInfo.id = foundMeeting.id
    newMeetingInfo.contactId = contactID

    meetings.splice(foundMeetingIndex, 1, newMeetingInfo)

    res.json({meeting: newMeetingInfo})
})

app.get('/contacts/:id/meetings', (req, res) => {
    const contactID = Number(req.params.id)

    const filteredMeetings = meetings.filter((meeting) => meeting.contactId === contactID)

    res.json({meetings: filteredMeetings})
})

app.post('/contacts/:id/meetings', (req, res) => {
    const contactID = Number(req.params.id)
    const meetingInfo = req.body

    if(!verifyMeetingProperties(meetingInfo)) {
        return res.status(400).json({message: 'invalid body'})
    }

    meetingInfo.contactId = contactID
    meetingInfo.id = meetingIdCounter

    meetings.push(meetingInfo)

    meetingIdCounter++

    res.status(201).json({meeting: meetingInfo})
})

function verifyContactProperties(object) {
    const neededProperties = ['firstName', 'lastName', 'street', 'city', 'type', 'email', 'linkedin', 'twitter']

    for (const item of neededProperties) {
        if (object[item] === undefined) {
            return false
        }
    }

    return true
}

function verifyMeetingProperties(object) {
    const neededProperties = 'name'

    if (object[neededProperties] === undefined) {
        return false
    }

    return true
}

module.exports = app
