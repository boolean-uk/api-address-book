const supertest = require('supertest')

describe('Address Book API', () => {
    let app, createTestFormData, updateTestFormData

    beforeEach(() => {
        app = require('../../../src/server.js')
        createTestFormData = require('../../fixtures/contacts/createTestFormData.js')
        updateTestFormData = require('../../fixtures/contacts/updateTestFormData.js')
    })

    describe('GET /contacts', () => {
        it('returns default contacts', async () => {
            const response = await supertest(app).get('/contacts')

            expect(response.status).toEqual(200)
            expect(response.body.contacts).not.toEqual(undefined)
            expect(response.body.contacts.length).toEqual(2)

            const [contact1, contact2] = response.body.contacts
            expect(contact1.firstName).toEqual('John')
            expect(contact1.lastName).toEqual('Carmack')
            expect(contact2.firstName).toEqual('Grace')
            expect(contact2.lastName).toEqual('Hopper')
        })
    })

    describe('GET /contacts/:id', () => {
        it('returns contact, id 2', async () => {
            const response = await supertest(app).get('/contacts/2')

            expect(response.status).toEqual(200)
            expect(response.body.contact).not.toEqual(undefined)

            const contact = response.body.contact
            expect(contact.id).toEqual(2)
            expect(contact.firstName).toEqual('Grace')
            expect(contact.lastName).toEqual('Hopper')
        })
    })

    describe('POST /contacts', () => {
        it('returns created contact', async () => {
            const response = await supertest(app)
                .post('/contacts')
                .send(createTestFormData)

            expect(response.status).toEqual(201)
            expect(response.body.contact).not.toEqual(undefined)

            const contact = response.body.contact
            expect(contact.id).toEqual(3)
            expect(contact.firstName).toEqual(createTestFormData.firstName)
            expect(contact.lastName).toEqual(createTestFormData.lastName)
        })

        it('adds contact to data store', async () => {
            await supertest(app).post('/contacts').send(createTestFormData)

            const response = await supertest(app).get('/contacts')

            expect(response.status).toEqual(200)
            expect(response.body.contacts).not.toEqual(undefined)
            expect(response.body.contacts.length).toEqual(3)

            const [contact1, contact2, contact3] = response.body.contacts
            expect(contact3.firstName).toEqual(createTestFormData.firstName)
            expect(contact3.lastName).toEqual(createTestFormData.lastName)
        })
    })

    describe('PUT /contacts', () => {
        let updatedContact
        beforeEach(() => {
            updatedContact = {
                ...updateTestFormData,
                id: 1,
            }
        })
        it('returns updated contact', async () => {
            const response = await supertest(app)
                .put(`/contacts/1`)
                .send(updateTestFormData)

            expect(response.status).toEqual(200)
            expect(response.body.contact).not.toEqual(undefined)

            const contact = response.body.contact
            expect(contact).toMatchObject(updatedContact)
        })

        it('updated contact is in data store', async () => {
            await supertest(app).put(`/contacts/1`).send(updateTestFormData)

            const response = await supertest(app).get('/contacts')

            expect(response.status).toEqual(200)
            expect(response.body.contacts).not.toEqual(undefined)
            expect(response.body.contacts.length).toEqual(2)

            const [contact1, contact2] = response.body.contacts
            expect(contact1.firstName).toEqual(updatedContact.firstName)
            expect(contact1.lastName).toEqual(updatedContact.lastName)
        })
    })

    describe('DELETE /contacts', () => {
        it('returns deleted contact', async () => {
            const response = await supertest(app).delete(`/contacts/1`)

            expect(response.status).toEqual(200)
            expect(response.body.contact).not.toEqual(undefined)
            expect(response.body.contact.id).toEqual(1)
        })

        it('removes contact from data store', async () => {
            const response = await supertest(app).delete(`/contacts/1`)

            const deletedContact = response.body.contact

            const response2 = await supertest(app).get('/contacts')

            expect(response2.status).toEqual(200)
            expect(response2.body.contacts).not.toEqual(undefined)
            expect(response2.body.contacts.length).toEqual(1)
            expect(response2.body.contacts).not.toContain(deletedContact)
        })
    })
})
