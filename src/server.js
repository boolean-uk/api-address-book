// import contacts from "../data/contacts"

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
// tried to import contacts but it would crash my terminal using npm start
// console.log(contacts)
const contacts = [
    {
      id: 1,
      firstName: "John",
      lastName: "Carmack",
      street: "10 Keen Street",
      city: "London",
      type: "work",
      email: "test@test.com",
      linkedin: "https://www.linkedin.com/school/boolean-uk/",
      twitter: "https://twitter.com/booleanuk"
    },
    {
      id: 2,
      firstName: "Grace",
      lastName: "Hopper",
      street: "32 Deebug Road",
      city: "London",
      type: "personal",
      email: "test@test.com",
      linkedin: "https://www.linkedin.com/school/boolean-uk/",
      twitter: "https://twitter.com/booleanuk"
    }
]

let idCount = 3
// const contacts = JSON.parse([
//   {
//     "id": 1,
//     "firstName": "John",
//     "lastName": "Carmack",
//     "street": "10 Keen Street",
//     "city": "London",
//     "type": "work",
//     "email": "test@test.com",
//     "linkedin": "https://www.linkedin.com/school/boolean-uk/",
//     "twitter": "https://twitter.com/booleanuk"
//   },
//   {
//     "id": 2,
//     "firstName": "Grace",
//     "lastName": "Hopper",
//     "street": "32 Deebug Road",
//     "city": "London",
//     "type": "personal",
//     "email": "test@test.com",
//     "linkedin": "https://www.linkedin.com/school/boolean-uk/",
//     "twitter": "https://twitter.com/booleanuk"
//   }
// ])

// console.log(contacts)

app.get("/contacts", (req, res) => {
  res.status(200).json({
    contacts
  })
})

app.get("/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
  const contact = contacts.find(con => con.id === id)
  // console.log(contact)
  res.json({
    contact
  })
})

app.post("/contacts", (req, res) => {
  // console.log(req.body)
  let newContact = req.body
  newContact.id = idCount
  idCount++

  contacts.push(newContact)
  res.status(201).json({
    contact: newContact
  })
})

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  let contactIndex
  for (let x = 0; x < contacts.length; x++) {
    if (contacts[x].id === id) {
      contactIndex = x
    }
  }
  let contact = contacts.splice(contactIndex, 1)
  // console.log(contact)
  res.status(200).json({
    contact: contact[0]
  })
})

app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id)
  // console.log(req.body)
  let contactIndex
  let newContact = req.body
  newContact.id = id 
  contacts.forEach((contact, index) => {
    if(contact.id === id) {
      contactIndex = index
    }
  })
  contacts.splice(contactIndex, 1, newContact)


  res.status(200).json({
    contact: newContact
  })
})




module.exports = app
