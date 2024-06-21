const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

let contacts = require("../data/contacts.js")
let contact_id_key = contacts.length + 1

app.get("/contacts", (req, res)=>{
    res.json({
        contacts
    })
})

app.post("/contacts", (req, res)=>{
    const newContact = req.body
    newContact.id = contact_id_key
    contacts.push(newContact)

    contact_id_key++

    res.status(201).json({contacts})
})

app.get("/contacts/:id", (req, res)=>{
    const id = Number(req.params.id)
    const found = contacts.find((contact) => contact.id === id)
    res.json({contact: found})
})


app.put("/contacts", (req, res)=>{})

app.delete("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const found = contacts.find((contact) => contact.id === id);
    contacts = contacts.filter((contact) => contact.id !== id);
    res.json({ contact: found });
  });
  

module.exports = app
