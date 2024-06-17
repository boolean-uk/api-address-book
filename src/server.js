const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const contacts = require("../data/contacts")
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

    if (result === -1) {
        return res.status(404).send({
            message: `contact with id of ${id} not found.`
        })
    }

    contacts.splice(contacts.indexOf(result), 1)
    
    res.json({
        contact: result
    })
})

app.put('/contacts/:id', (req, res) => {
    const contact = req.body
    const id = Number(req.params.id)
    const result = contacts.find(c => c.id === id)

    if (result === -1) {
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

module.exports = app
