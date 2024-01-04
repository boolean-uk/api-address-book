// FUNCTS
const createContact = (req, data, currentId) => {
    const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body
    
    const newContact = {
        id: ++currentId,
        firstName,
        lastName,
        street,
        city,
        type,
        email,
        linkedin,
        twitter
    }
    data.push(newContact)
    return newContact
}

const formatContact = (contact) => {
    const response = {
        "contact": contact
    }
    return response
}

const findContact = (req, res, data) => {
    const contactId = Number(req.params.id)
    const foundContact = data.find(contact => contact.id === contactId)

    if (!foundContact) return res.status(404).json(`Contact with id ${contactId} does not exist`)
    return foundContact
}

const removeContact = (data, contact) => {
    const contactIndex = data.indexOf(contact)
    data.splice(contactIndex, 1)
}

const updateContact = (req, contact) => {
    const { firstName, lastName, street, city, type, email, linkedin, twitter } = req.body

    contact.firstName = firstName
    contact.lastName = lastName
    contact.street = street
    contact.city = city
    contact.type = type
    contact.email = email
    contact.linkedin = linkedin
    contact.twitter = twitter
    return contact
}

module.exports = { createContact, formatContact, findContact, removeContact, updateContact }