const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const contacts = require('../data/contacts.js')
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

app.get('/contacts', (req, res) => {
    res.status(200).json({contacts})
})

app.post('/contacts', (req, res) => {
    const newContact = req.body
    newContact.id = contacts.length + 1
    contacts.push(newContact)
    res.status(201).json(newContact)
})

app.get('/contacts/:id', (req, res) => {
    const contactId = req.params.id
    const contact = contacts.find((contact) => contact.id === Number(contactId))
    res.status(200).json({contact})
})

module.exports = app
