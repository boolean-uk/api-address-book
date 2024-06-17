const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const contacts = require('../data/contacts.js')

let createContact = {
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

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.get('/contacts', (req, res) => {
    res.status(200).json({contacts: contacts})
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

    createContact.id = newID.id += 1
    createContact.firstName = firstName
    createContact.lastName = lastName
    createContact.street = street
    createContact.city = city
    createContact.type = type
    createContact.email = email
    createContact.linkedin = linkedin
    createContact.twitter = twitter
    
    console.log(createContact)
    contacts.push(createContact)
    res.status(201).json({
        createContact
    })
})


module.exports = app
