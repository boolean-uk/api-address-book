const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const contacts = require('../data/contacts')
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

app.get('/contacts', (req, res) => {
    contacts
    res.status(200).json({
        contacts
    })
})

app.get('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)

    const foundContact = contacts.find(i => i.id === 2)

    if ( id != 2 && !foundContact) {
        return res.status(404).json({
        })
    }
    res.status(200).json({
        contact: foundContact
    })
})

let id = contacts.length + 1
app.post('/contacts', (req, res) => {
	const contact = req.body
	contact.id = id
	id++
	contacts.push(contact)

	res.status(201).json({ contact })
})

app.delete('/contacts/:id', (req, res) => {
    const id = Number(req.params.id)
  
    const contactFound = contacts.find((c) => c.id === id)
    const contactIndex = contacts.indexOf(contactFound)
    contacts.splice(contactIndex, 1)
    return res.status(200).json({ contactFound })
})

app.put('/contacts/:id', (req, res) => {
	const contactId = Number(req.params.id)
	const updatedContact = req.body
	updatedContact.id = contactId
	contacts.splice(contactId - 1, 1, updatedContact)
	res.status(200).json({ 'contact': updatedContact })
})

module.exports = app
