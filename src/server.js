const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const contacts = require('../data/contacts')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/contacts', (req, res) => {
    res.status(200).json({ contacts: contacts })
})

app.get('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const contact = contacts.find((contact) => {
        return contact.id === id
    })

    res.status(200).json({ contact: contact })
})

let nextContactId = 3

app.post('/contacts', (req, res) => {
    const contact = req.body
    contact.id = nextContactId

    nextContactId++

    contacts.push(contact)
    res.status(201).json({ contact })
})

app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedContact = req.body

    const index = contacts.findIndex((contact) => {
        return contact.id === id
    })

    contacts[index] = {
        ...updatedContact,
        id: id,
    }

    res.status(200).json({ contact: contacts[index] })
})

app.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const contactIndex = contacts.findIndex((contact) => contact.id === id)
    const [deletedContact] = contacts.splice(contactIndex, 1)

    res.status(200).json({ contact: deletedContact })
})

module.exports = app
