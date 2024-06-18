const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
let contacts = require('../data/contacts.js')
let meetings = require('../data/meetings.js')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// write your app code here

let nextId = 3

app.get('/contacts', (req, res) => {
    res.send({ contacts: contacts })
})

app.post('/contacts', (req, res) => {
    const newContact = { id: nextId, ...req.body }

    contacts.push(newContact)

    nextId++

    res.status(201).send({ contact: newContact })
})

app.get('/contacts/:id', (req, res) => {
    const matchingContact = contacts.find((element) => {
        return element.id === parseInt(req.params['id'])
    })

    if (!matchingContact) {
        res.sendStatus(404)
    }

    res.send({ contact: matchingContact })
})

app.delete('/contacts/:id', (req, res) => {
    const matchingContact = contacts.find((element) => {
        return element.id === parseInt(req.params['id'])
    })

    if (!matchingContact) {
        res.sendStatus(404)
    }

    contacts = contacts.filter((element) => {
        return !(element.id === parseInt(req.params['id']))
    })

    meetings = meetings.filter((element) => {
        return !(element.contactId === parseInt(req.params['id']))
    })

    res.send({ contact: matchingContact })
})

app.put('/contacts/:id', (req, res) => {
    let matchingContact = contacts.find((element) => {
        return element.id === parseInt(req.params['id'])
    })

    if (!matchingContact) {
        res.sendStatus(404)
    }

    Object.keys(matchingContact).forEach((element) => {
        matchingContact[element] = req.body[element]
    })

    matchingContact.id = parseInt(req.params['id'])

    res.send({ contact: matchingContact })
})

let nextMeetingId = 4

app.get('/meetings', (req, res) => {
    res.send({ meetings: meetings })
})

app.post('/contacts/:id/meetings', (req, res) => {
    const newMeeting = {
        id: nextMeetingId,
        contactId: parseInt(req.params['id']),
        ...req.body,
    }

    meetings.push(newMeeting)

    nextMeetingId++

    res.status(201).send({ meeting: newMeeting })
})

app.get('/meetings/:id', (req, res) => {
    const matchingMeeting = meetings.find((element) => {
        return element.contactId === parseInt(req.params['id'])
    })

    if (!matchingMeeting) {
        res.sendStatus(404)
    }

    res.send({ meeting: matchingMeeting })
})

app.delete('/meetings/:id', (req, res) => {
    const matchingMeeting = meetings.find((element) => {
        return element.id === parseInt(req.params['id'])
    })

    if (!matchingMeeting) {
        res.sendStatus(404)
    }

    meetings = meetings.filter((element) => {
        return !(element.id === parseInt(req.params['id']))
    })

    res.send({ meeting: matchingMeeting })
})

app.put('/meetings/:id', (req, res) => {
    
    let matchingMeeting = meetings.find((element, index) => {
        return element.id === parseInt(req.params['id'])
    })

    if (!matchingMeeting) {
        res.sendStatus(404)
    }

    Object.keys(matchingMeeting).forEach((element) => {
        if (req.body[element]) {
            matchingMeeting[element] = req.body[element]
        }
    })

    res.send({ meeting: matchingMeeting })
})

app.get('/contacts/:id/meetings', (req, res) => {
    const contactsMeetings = meetings.filter((element) => {
        return element.contactId === parseInt(req.params['id'])
    })

    res.send({ meetings: contactsMeetings })
})

module.exports = app
