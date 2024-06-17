const contacts = require('../data/contacts.js')

function findID(id) {
    const found = contacts.find((c) => c.id === id)
    return found
}

module.exports = findID