const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const contacts = require("../data/contacts")
const meetings = require("../data/meetings")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const contactObj = [
    'firstName', 
    'lastName', 
    'street', 
    'city', 
    'type', 
    'email', 
    'linkedin', 
    'twitter'
]

const meetingsObj = ['name']

app.get('/contacts', (req, res) => {
    res.json({
        contacts: contacts
    })
})

app.post('/contacts', (req, res) => {
    const contact = req.body

    for (const prop of contactObj) {
        if (contact[prop] === undefined) {
            return res.status(400).send({
                message: `${prop} is missing.`
            })
        }
    }

    for (const prop in contact) {
        if (typeof contact[prop] !== 'string') {
            return res.status(400).send({
                message: `${prop} needs to be a string.`
            })
        }

        if (!contactObj.includes(prop)) {
            return res.status(400).send({
                message: `${prop} isn't a contact property.`
            })
        }
    }

    const contactId = { id: contacts.length + 1, ...contact }
    contacts.push(contactId)

    res.status(201).json({
        contact: contactId
    })
})

app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = contacts.find(contact => contact.id === id)

    if (!result) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    res.json({
        contact: result
    })
})

app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = contacts.find(contact => contact.id === id)
    const contactMeetings = meetings.filter(m => m.contactId === result.id)

    if (!result) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    contactMeetings.forEach(meeting => {
        meetings.splice(meetings.indexOf(meeting), 1)
    })
    
    contacts.splice(contacts.indexOf(result), 1)

    res.json({
        contact: result
    })
})

app.put('/contacts/:id', (req, res) => {
    const contact = req.body
    const id = Number(req.params.id)
    const result = contacts.find(c => c.id === id)

    if (!result) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    for (const prop of contactObj) {
        if (contact[prop] === undefined) {
            return res.status(400).send({
                message: `${prop} is missing.`
            })
        }
    }

    for (const prop in contact) {
        if (typeof contact[prop] !== 'string') {
            return res.status(400).send({
                message: `${prop} needs to be a string.`
            })
        }

        if (!contactObj.includes(prop)) {
            return res.status(400).send({
                message: `${prop} isn't a contact property.`
            })
        }
    }

    const contactId = { id: result.id, ...contact }
    contacts.splice(contacts.indexOf(result), 1, contactId)

    res.json({
        contact: contactId
    })
})

app.get('/meetings', (req, res) => {
    res.json({
        meetings: meetings
    })
})

app.get('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = meetings.find(meeting => meeting.id === id)

    if (!result) {
        return res.status(404).send({
            message: `meeting with id of ${id} not found.`
        })
    }

    res.json({
        meeting: result
    })
})

app.delete('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = meetings.find(meeting => meeting.id === id)

    if (!result) {
        return res.status(404).send({
            message: `meeting with id of ${id} not found.`
        })
    }

    meetings.splice(meetings.indexOf(result), 1)

    res.json({
        meeting: result
    })
})

app.put('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = meetings.find(meeting => meeting.id === id)
    const meeting = req.body

    if (!result) {
        return res.status(404).send({
            message: `meeting with id of ${id} not found.`
        })
    }

    for (const prop of meetingsObj) {
        if (meeting[prop] === undefined) {
            return res.status(400).send({
                message: `${prop} is missing`
            })
        }
    }

    for (const prop in meeting) {
        if (typeof meeting[prop] !== 'string') {
            return res.status(400).send({
                message: `${prop} needs to be a string`
            })
        }

        if (!meetingsObj.includes(prop)) {
            return res.status(400).send({
                message: `${prop} isn't a meeting property`
            })
        }
    }

    const meetingIDs = { 
        ...meeting, 
        contactId: result.contactId, 
        id: result.id 
    }

    meetings.splice(meetings.indexOf(result), 1, meetingIDs)

    res.json({
        meeting: meetingIDs
    })
})

app.get('/contacts/:id/meetings', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)

    if (!contact) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    const meeting = meetings.filter(m => m.contactId === contact.id)

    if (meeting.length === 0) {
        return res.status(404).send({
            message: `${contact.firstName} ${contact.lastName} didn't have any meeting.`
        })
    }

    res.json({
        meetings: meeting
    })
})

app.post('/contacts/:id/meetings', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)
    const meeting = req.body

    if (!contact) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    for (const prop of meetingsObj) {
        if (meeting[prop] === undefined) {
            return res.status(404).json({
                message: `${prop} is missing`
            })
        }
    }

    for (const prop in meeting) {
        if (typeof meeting[prop] !== 'string') {
            return res.status(404).json({
                message: `${prop} needs to be a string`
            })
        }

        if (!meetingsObj.includes(prop)) {
            return res.status(404).json({
                message: `${prop} isn't a meeting property`
            })
        }
    }

    const meetingIDs = {  
        ...meeting, 
        contactId: contact.id, 
        id: meetings.length + 1 
    }

    meetings.push(meetingIDs)

    res.status(201).json({
        meeting: meetingIDs
    })
})

module.exports = app
