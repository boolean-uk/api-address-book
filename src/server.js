const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

const contacts = [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Carmack",
      "street": "10 Keen Street",
      "city": "London",
      "type": "work",
      "email": "test@test.com",
      "linkedin": "https://www.linkedin.com/school/boolean-uk/",
      "twitter": "https://twitter.com/booleanuk"
    },
    {
      "id": 2,
      "firstName": "Grace",
      "lastName": "Hopper",
      "street": "32 Deebug Road",
      "city": "London",
      "type": "personal",
      "email": "test@test.com",
      "linkedin": "https://www.linkedin.com/school/boolean-uk/",
      "twitter": "https://twitter.com/booleanuk"
    }
  ]


app.get('/contacts', (req, res) => {

    return res.send({contacts})
})

app.get('/contacts/:id', (req, res) => {

    const idStore = Number(req.params.id)
    const searchResult = contacts.find(contact => {
        return contact.id === idStore
    }) 

    return res.status(200).send({contact: searchResult})
})

app.post('/contacts', (req, res) => {

  const body = req.body
  const prevId = contacts[contacts.length - 1].id
  body.id = prevId + 1
  contacts.push(body)

  return res.status(201).send({contact: body})
})

app.delete('/contacts/:id', (req, res) => {

  const idStore = Number(req.params.id)
  const searchResult = contacts.find(contact => {
    return contact.id === idStore
}) 

  const indexStore = contacts.indexOf(searchResult)
  contacts.splice(indexStore ,1)

  return res.send({ contact: searchResult })
})

app.put('/contacts/:id', (req, res) => {

  const idStore = Number(req.params.id)
  const searchResult = contacts.findIndex(contact => {
    return contact.id === idStore
}) 

  const contact = req.body

  contact.id = idStore

  contacts[searchResult] = contact

  return res.status(200).send({contact: contact })
})

module.exports = app
