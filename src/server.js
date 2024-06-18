const express = require('express');
const app = express();

app.use(express.json());

// Data
let contacts = [
    { id: 1, firstName: "John", lastName: "Carmack" },
    { id: 2, firstName: "Grace", lastName: "Hopper" }
];

let meetings = [
    { id: 1, name: "a test meeting about life", contactId: 1 },
    { id: 2, name: "another test meeting for wondering about existence", contactId: 2 },
    { id: 3, name: "a new meeting for the hopeful", contactId: 1 }
];

// Routes for contacts
app.get('/contacts', (req, res) => {
    res.json({ contacts });
});

app.get('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) {
        return res.status(404).send('Contact not found');
    }
    res.json({ contact });
});

app.post('/contacts', (req, res) => {
    const newContact = { ...req.body, id: contacts.length + 1 };
    contacts.push(newContact);
    res.status(201).json({ contact: newContact });
});

app.put('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (!contact) {
        return res.status(404).send('Contact not found');
    }
    Object.assign(contact, req.body);
    res.json({ contact });
});

app.delete('/contacts/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === parseInt(req.params.id));
    if (contactIndex === -1) {
        return res.status(404).send('Contact not found');
    }
    const [deletedContact] = contacts.splice(contactIndex, 1);
    meetings = meetings.filter(m => m.contactId !== deletedContact.id);
    res.json({ contact: deletedContact });
});

// Routes for meetings
app.get('/meetings', (req, res) => {
    res.json({ meetings });
});

app.get('/meetings/:id', (req, res) => {
    const meeting = meetings.find(m => m.id === parseInt(req.params.id));
    if (!meeting) {
        return res.status(404).send('Meeting not found');
    }
    res.json({ meeting });
});

app.post('/contacts/:id/meetings', (req, res) => {
    const contactId = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) {
        return res.status(404).send('Contact not found');
    }
    const newMeeting = { ...req.body, id: meetings.length + 1, contactId };
    meetings.push(newMeeting);
    res.status(201).json({ meeting: newMeeting });
});

app.put('/meetings/:id', (req, res) => {
    const meeting = meetings.find(m => m.id === parseInt(req.params.id));
    if (!meeting) {
        return res.status(404).send('Meeting not found');
    }
    Object.assign(meeting, req.body);
    res.json({ meeting });
});

app.delete('/meetings/:id', (req, res) => {
    const meetingIndex = meetings.findIndex(m => m.id === parseInt(req.params.id));
    if (meetingIndex === -1) {
        return res.status(404).send('Meeting not found');
    }
    const [deletedMeeting] = meetings.splice(meetingIndex, 1);
    res.json({ meeting: deletedMeeting });
});

app.get('/contacts/:id/meetings', (req, res) => {
    const contactId = parseInt(req.params.id);
    const contactMeetings = meetings.filter(m => m.contactId === contactId);
    res.json({ meetings: contactMeetings });
});

module.exports = app;
