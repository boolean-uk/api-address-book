const supertest = require('supertest')

describe('Address Book API', () => {
  let app, createTestFormData, updateTestFormData, expectedMeetings

  beforeEach(() => {
    app = require('../../../src/server.js')
    createTestFormData = require('../../fixtures/meetings/createTestFormData.js')
    expectedMeetings = [
      {
        "name": "a test meeting about life",
        "contactId": 1,
        "id": 1
      },
      {
        "name": "another test meeting for wondering about existence",
        "contactId": 2,
        "id": 2
      },
      {
        "name": "a new meeting for the hopeful",
        "contactId": 1,
        "id": 3
      }
    ]
  })

  describe('GET', () => {
    describe('GET /meetings', () => {
      it('returns default meetings', async () => {
        const response = await supertest(app).get('/meetings')

        expect(response.status).toEqual(200)
        expect(response.body.meetings).not.toEqual(undefined)
        expect(response.body.meetings.length).toEqual(3)
        expect(response.body.meetings).toEqual(expectedMeetings)
      })
    })

    describe('GET /meetings/:id', () => {
      it('returns default meetings', async () => {
        const response = await supertest(app).get('/meetings/1')

        expect(response.status).toEqual(200)
        expect(response.body.meeting).not.toEqual(undefined)
        expect(response.body.meeting).toMatchObject(expectedMeetings[0])
      })
    })

    describe('PUT /meetings/:id', () => {
      it('returns updated meeting for contact of id 1', async () => {
        const response = await supertest(app)
          .put('/meetings/1')
          .send(createTestFormData)

        expect(response.status).toEqual(200)

        const meeting = response.body.meeting

        expect(meeting).not.toEqual(undefined)
        expect(meeting.id).toEqual(1)
        expect(meeting.name).toEqual(createTestFormData.name)
        expect(meeting.contactId).toEqual("1")
      })

      it('datastore is updated with meeting', async () => {
        await supertest(app)
          .put('/meetings/1')
          .send(createTestFormData)

        const response = await supertest(app).get('/meetings/1')

        expect(response.status).toEqual(200)
        expect(response.body.meeting).not.toEqual(undefined)
        expect(response.body.meeting).toMatchObject({
          "name": 'best meeting ever',
          "contactId": 1,
          "id": 1
        })
      })
    })

    describe('DELETE /meetings/:id', () => {
      it('returns deleted meeting', async () => {
        const response = await supertest(app)
          .delete(`/meetings/1`)

        expect(response.status).toEqual(200)
        expect(response.body.meeting).not.toEqual(undefined)
        expect(response.body.meeting).toMatchObject(expectedMeetings[0])
      })

      it('removes meeting from data store', async () => {
        const response = await supertest(app)
          .delete(`/meetings/1`)

        const deletedMeeting = response.body.deletedMeeting

        const response2 = await supertest(app).get('/meetings')

        expect(response2.status).toEqual(200)
        expect(response2.body.meetings).not.toEqual(undefined)
        expect(response2.body.meetings.length).toEqual(2)
        expect(response2.body.meetings).not.toContain(deletedMeeting)
      })

      it('deleting a contact, also deletes all its meetings from data store', async () => {
        await supertest(app)
          .delete(`/contacts/1`)

        const response2 = await supertest(app).get('/meetings')

        expect(response2.status).toEqual(200)
        expect(response2.body.meetings).not.toEqual(undefined)
        expect(response2.body.meetings.length).toEqual(1)
        expect(response2.body.meetings).not.toContain(expectedMeetings[1])
      })
    })

    describe('GET /contacts/:id/meetings', () => {
      beforeEach(() => {
        expectedMeetings = [
          {
            "name": "a test meeting about life",
            "contactId": 1,
            "id": 1
          },
          {
            "name": "a new meeting for the hopeful",
            "contactId": 1,
            "id": 3
          }
        ]
      })
      it('returns meetings for contact', async () => {
        const response = await supertest(app).get('/contacts/1/meetings')

        expect(response.status).toEqual(200)
        expect(response.body.meetings).not.toEqual(undefined)
        expect(response.body.meetings.length).toEqual(2)
        expect(response.body.meetings).toEqual(expectedMeetings)
      })
    })
  })

  describe('POST /contacts/:id/meetings', () => {
    it('returns created meeting for contact of id 1', async () => {
      const response = await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)

      expect(response.status).toEqual(201)
      expect(response.body.meeting).not.toEqual(undefined)

      const meeting = response.body.meeting
      expect(meeting.id).toEqual(4)
      expect(meeting.name).toEqual(createTestFormData.name)
      expect(meeting.contactId).toEqual("1")
    })

    it('adds meeting to data store for contact of id 1', async () => {
      const responseBefore = await supertest(app).get('/meetings')
      await supertest(app)
        .post('/contacts/1/meetings')
        .send(createTestFormData)
      const responseAfter = await supertest(app).get('/meetings')

      expect(responseBefore.body.meetings).not.toEqual(undefined)
      expect(responseAfter.body.meetings).not.toEqual(undefined)
      expect(responseBefore.body.meetings.length).toEqual(3)
      expect(responseAfter.body.meetings.length).toEqual(4)
    })
  })
})
