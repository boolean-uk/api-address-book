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

//gets all contacts
app.get('/contacts', (request, respond) => {
    respond.status(200).json({ contacts })
})

// gets a contact by Id
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

//create a new contact
app.post('/contacts', (request, respond) => {
   const newContact = request.body
   newContact.id = nextId++
   contacts.push(newContact)
   respond.status(201).json({ contact: newContact })

})

// edit and update a contact
app.put('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const index = contacts.findIndex (c => c.id === id)
    if (index !== -1) {
        contacts[index] = {...contacts[index], ...request.body}
        const updatedContact = contacts[index]
        respond.status(200).json({contact: updatedContact})
    } else {
        respond.status(404).json('Message: Contacts not found')
    }
   
})


//then delete a contact
app.delete('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const index = contacts.findIndex(c => c.id === id)
    if (index !== -1) {
        const deletedContact = contacts.splice(index, 1)
        respond.status(200).json ({ contact: deletedContact[0] })
    } else {
        respond.status(404).json('Message: contacts not found')
    }
})


module.exports = app
