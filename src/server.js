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

module.exports = app
