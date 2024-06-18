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

  return res.status(201).json(contacts)

})

app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  const found = contacts.find(c => c.id === id)
  if(!found) {
   return res.status(404).json('Didnt find anything')
  }
  return res.status(200).json( found )
})

app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  const found = contacts.findIndex(c => c.id === id)
  if(found === -1 || found === undefined) {
    return res.status(404).json('Didnt find anything')
   }

   const newContact = contacts.splice( found, 1 )
   console.log(newContact)
   return res.status(200).json(newContact)
})

app.put('/contacts/:id', (req, res) => {
  const {firstName, lastName, street, city, type, email, linkedin, twitter } = req.body
  const id = Number(req.params.id)
  let myIndex = 0
  console.log('test1')
  const found = contacts.findIndex((c, index) => {
    
    myIndex = index
    console.log(c.id, 'test,', id)
    return c.id === id
  })
  console.log(found)
  if(found === -1) {
    console.log('test3')
    return res.status(404).json({
      message : 'Didnt Find the contact with that id!'
    })
  }

  contacts[myIndex] = {
    id:id,
    firstName :firstName,
    lastName : lastName,
    street : street,
    city : city,
    type : type,
    email: email,
    linkedin: linkedin,
    twitter : twitter
  }

  res.status(200).json(contacts)


})



module.exports = app
