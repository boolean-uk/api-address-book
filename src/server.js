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
  const contact = {
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
  contacts.push(contact)

  return res.status(201).json({contact})

})

app.get('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  const contact = contacts.find(c => c.id === id)
  if(!contact) {
   return res.status(404).json('Didnt find anything')
  }
  res.status(200).json( {contact} )
})

app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id)

  const found = contacts.findIndex(c => c.id === id)
  console.log('index ', found, 'id ', id)
  if(found === -1 || found === undefined) {
    return res.status(404).json('Didnt find anything')
   }

   const contact = contacts.splice( found, 1 )

   console.log(contact[0].id)
   res.status(200).json({contact : contact[0]})
})

app.put('/contacts/:id', (req, res) => {
  const {firstName, lastName, street, city, type, email, linkedin, twitter } = req.body
  const id = Number(req.params.id)
  let myIndex = 0
  const contact = contacts.findIndex((c, index) => {
    
    myIndex = index
    console.log(c.id, 'test,', id)
    return c.id === id
  })
  if(contact === -1) {
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

  return res.status(200).json({contact : contacts[myIndex]})


})



module.exports = app
