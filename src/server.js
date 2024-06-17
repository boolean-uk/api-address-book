const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const contacts = require("../data/contacts")

let idCounter = 3

app.get('/contacts', (req, res) => {
    res.status(200).json({
        contacts
    })
})

app.post('/contacts', (req, res) => {
    const contact = req.body

    if (contact) {
        contact.id = idCounter
        contacts.push(contact)

        idCounter++

        res.status(201).json({contact})
    }
})

app.get('/contacts/:id', (req, res) => {
    const contactID = Number(req.params.id)
    console.log(contactID)

    const foundContact = contacts.find((contact) => contact.id === contactID)

    res.status(200).json({contact: foundContact})
})

module.exports = app
