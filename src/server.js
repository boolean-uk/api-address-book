const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

let contacts = [
    {id: 1, firstName: 'Abiodun', lastName: 'Oluwagbemi'}, 
    {id: 2, firstName: 'Nathan', lastName: 'King'},
    {id: 3, firstName: 'Lewis', lastName: 'Capaldi'}
]
let nextId = 4

app.get('/contacts', (request, respond) => {
    respond.status(200).json({ contacts })
})

app.get('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        respond.status(200).json({ contact })
    } else {
        //respond.status(404).send('Contact not found')
       respond.status(404).json({ contact })
    }
}) 

app.post('/contacts', (request, respond) => {
   const newContact = request.body
   newContact.id = nextId++
   contacts.push(newContact)
   respond.status(201).json({ contact: newContact })

})

app.put('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const index = contacts.findIndex (c => c.id === id)
    if (index !== -1) {
        contacts[index] = {...contacts[index], ...request.body}
        respond.status(200).json({contacts: contacts[index]})
    } else {
        respond.status(404).json('Contacts not found')
    }
   
})

app.delete('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const index = contacts.findIndex(c => c.id === id)
    if (index !== -1) {
        const deleteContact = contacts.splice(index, 1)
        respond.status(200).json ({ contact: deleteContact[0] })
    } else {
        respond.status(404).json('contacts not found')
    }
})


module.exports = app
