const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const initialContacts = require("../data/contacts")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = initialContacts

const findById = (id) => {
    return contacts.find((c) => c.id === id)
}

const findIndexById = (id) => {
    return contacts.findIndex((c) => c.id === id)
}

app.get('/contacts', (req, res) => {
    return res.send({contacts})
})

app.post('/contacts', (req, res) => {
    const contact = req.body
    contact.id = contacts.length + 1
    contacts.push(contact)
    return res.status(201).send({contact})

})

app.get('/contacts/:id', (req, res) => {
    const { id } = req.params
    const contact = findById(Number(id))
    return res.send({contact})
})

app.delete('/contacts/:id', (req, res) => {
    const { id }= req.params
    const contact = findById(Number(id))
    const tarIn = findIndexById(Number(id))
    console.log('the target index is', tarIn)
    contacts.splice(tarIn, 1)
    return res.send({contact})

})

app.put('/contacts/:id', (req, res) => {
    const { id } = req.params
    const tarIn = findIndexById(Number(id))
    const contact = req.body
    contact.id = Number(id)
    contacts.splice(tarIn, 1, contact)
    return res.send({contact})

})


module.exports = app
