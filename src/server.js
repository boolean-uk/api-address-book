const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
let contacts = require('../data/contacts.js')

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

module.exports = app
