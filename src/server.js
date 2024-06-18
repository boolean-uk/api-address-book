const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const contacts = require('../data/contacts.js')
const { firstName, lastName, linkedin, twitter } = require("../test/fixtures/contacts/createTestFormData.js")
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
let id = contacts.length
// write your app code here

app.get('/contacts', (req, res) => {
  res.status(200).json({
    contacts : contacts
  })
})

app.post('/contacts', (req, res) => {
  const {firstName, lastName, street, city, type, email, linkedin, twitter } = req.body
  
  id++
  const newContact = {
    id,
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter
  }
  contacts.push(newContact)

  res.status(201).json(contacts)

})





module.exports = app
