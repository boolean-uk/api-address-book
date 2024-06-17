const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
let contacts = require("../data/contacts.js")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
let newId = contacts.length + 1

app.get("/contacts", (req, res) => {
	res.status(200).json({ contacts })
})

app.post("/contacts", (req, res) => {
	const contact = req.body
	contact.id = newId
	newId += 1
	contacts.push(contact)

	res.status(201).json({ contact })
})

app.get("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const contact = contacts.find((c) => c.id === contactId)
	res.status(200).json({ contact: contact })
})

app.delete("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const contact = contacts.find((c) => c.id === contactId)
	// contacts.splice(contactId, 1)
	contacts = contacts.filter((c) => c.id !== contactId)
	res.status(200).json({ contact })
})

app.put("/contacts/:id", (req, res) => {
	const contactId = Number(req.params.id)
	const updatedContact = req.body
	updatedContact.id = contactId
	contacts.splice(contactId - 1, 1, updatedContact)
	res.status(200).json({ 'contact': updatedContact })
})

module.exports = app
