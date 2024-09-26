const express = require('express')
const router = express.Router()
const contacts = require('../../data/contacts')

let newId = contacts.length
// Get all list
router.get('/', (req, res) => {
	return res.send({ contacts })
})

// Create contact
router.post('/', (req, res) => {
	newId++
	const newContact = {
		...req.body,
		id: newId,
	}
	contacts.push(newContact)
	return res.status(201).send({ contact: newContact })
})

// Contact by ID
router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	const contact = contacts.find((contact) => contact.id === id)
	return res.send({ contact: contact })
})

// Delete contact by ID
router.delete('/:id', (req, res) => {
	const id = Number(req.params.id)
	const contactIndex = contacts.findIndex((contact) => contact.id === id)
	const deletedContact = contacts.splice(contactIndex, 1)[0]
	return res.send({ contact: deletedContact })
})

// Update by ID
router.put('/:id', (req, res) => {
	const id = Number(req.params.id)
	const body = req.body
	let contactToUpdate = contacts.find((contact) => contact.id === id)
	Object.assign(contactToUpdate, body)
	return res.status(200).send({ contact: contactToUpdate })
})

module.exports = router
