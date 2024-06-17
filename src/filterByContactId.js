function filterByContactId(data, id) {
    const found = data.filter((d) => d.contactId === id)
    return found
}

module.exports = filterByContactId