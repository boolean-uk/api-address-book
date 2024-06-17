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

app.get('/contacts', (req, res) => {
    res.json({
        contacts
    })
})

app.post('/contacts', (req, res) => {
    const contact = req.body

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

    res.json({contact: foundContact})
})

app.put('/contacts/:id', (req, res) => {
    const newContactInfo = req.body
    const contactID = Number(req.params.id)
    const foundContact = contacts.find((contact) => contact.id === contactID)
    const foundContactIndex = contacts.indexOf(foundContact)
    
    newContactInfo.id = contactID

    contacts.splice(foundContactIndex, 1, newContactInfo)

    res.json({contact: newContactInfo})
})

app.get('/meetings', (req, res) => {
    res.json({meetings})
})

module.exports = app
