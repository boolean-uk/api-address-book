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

app.post('/contacts', (req, res) => {
    req.body
})

module.exports = app
