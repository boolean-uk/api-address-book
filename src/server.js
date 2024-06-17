const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require('../data/contacts.js')
const meetings = require('../data/meetings.js')
const findID = require('./findID.js')
const deletedContacts = require('../data/deletedContacts.js')
const deletedMeetings = require("../data/deletedMeetings.js")


let newContact = {
    id: 0,
    firstName: 'string',
    lastName: 'string',
    street: 'string',
    city: 'string',
    type: 'string',
    email: 'string',
    linkedin: 'string',
    twitter: 'string'
}

const idError = {
    error: 'invalid-ID',
    message: 'ID provided does not exist, please ensure a valid ID is provided'
}

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.get('/contacts', (req, res) => {
    res.status(200).json({
        contacts: contacts
    })
})

app.post('/contacts', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const street = req.body.street
    const city = req.body.city
    const type = req.body.type
    const email = req.body.email
    const linkedin = req.body.linkedin
    const twitter = req.body.twitter
    const newID = contacts.reverse().find((c) => c.id)

    newContact.id = newID.id +1
    newContact.firstName = firstName
    newContact.lastName = lastName
    newContact.street = street
    newContact.city = city
    newContact.type = type
    newContact.email = email
    newContact.linkedin = linkedin
    newContact.twitter = twitter
    
    contacts.push(newContact)
    res.status(201).json({
        contact: newContact
    })
})

app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = findID(contacts, id)

    if(!found) {
        return res.status(404).json({
            idError
        })
    }

    res.status(200).json({
        contact: found
    })
})

app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = findID(contacts, id)

    if(!found) {
        return res.status(404).json({
            idError
        })
    }
    const index = contacts.indexOf(found)

    deletedContacts.push(found)
    contacts.splice(index, 1)
    res.status(200).json({
        contact: found
    })
})

app.put('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = findID(contacts, id)

    if(!found) {
        return res.status(404).json({
            idError
        })
    }
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const street = req.body.street
    const city = req.body.city
    const type = req.body.type
    const email = req.body.email
    const linkedin = req.body.linkedin
    const twitter = req.body.twitter


    found.firstName = firstName
    found.lastName = lastName
    found.street = street
    found.city = city
    found.type = type
    found.email = email
    found.linkedin = linkedin
    found.twitter = twitter

    res.status(200).json({
        contact: found
    })
})

app.get('/meetings', (req, res) => {
    res.status(200).json({
        meetings: meetings
    })
})

app.get('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = findID(meetings, id)

    if(!found) {
        return res.status(404).json({
            idError
        })
    }

    res.status(200).json({
        meeting: found
    })
})

app.delete('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = findID(meetings, id)

    if(!found) {
        return res.status(404).json({
            idError
        })
    }

    const index = meetings.indexOf(found)
    deletedMeetings.push(found)
    meetings.splice(index, 1)

    res.status(200).json({
        meeting: found
    })
})

app.put('/meetings/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundMeeting = findID(meetings, id)
    const foundContact = findID(contacts, id)

    if(!foundMeeting) {
        return res.status(404).json({
            idError
        })
    }

    foundMeeting.id = foundContact.id
    foundMeeting.name = req.body.name
    res.status(200).json({
        meeting: foundMeeting
    })
    
})

module.exports = app
