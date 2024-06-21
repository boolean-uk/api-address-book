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
    res.status(201).json({contact:newContact});
});

app.get("/contacts/:id", (req, res)=>{
    const id = Number(req.params.id)
    const found = contacts.find((contact) => contact.id === id);
    res.json({contact: found});
})


app.put("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
    let found = contacts.find((contact) => contact.id === id);
    const foundIndex = contacts.indexOf(found)
    const updated = { ...found, ...updates };
    contacts.splice(foundIndex, 1, updated)
    res.json({ contact: updated });
});
 
  
app.delete("/contacts/:id", (req, res) => {
    const id = Number(req.params.id);
    const found = contacts.find((contact) => contact.id === id);
    contacts = contacts.filter((contact) => contact.id !== id);
    res.json({ contact: found });
  });
  

  //meetings
  let meetings = require("../data/meetings.js");
  let meeting_id_key = meetings.length + 1;
  
  app.get("/meetings", (req, res) => {
      res.json({
          meetings,
      });
    });
  
    app.get("/meetings/:id", (req, res) => {
        const id = Number(req.params.id);
      const found = meetings.find((meeting) => meeting.id === id);
      res.json({ meeting: found });
      });
    


module.exports = app
