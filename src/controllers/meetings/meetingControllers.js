const meetings = require("../../../data/meetings.js")
const { verifyMeetingBody } = require("../../domain/contacts/contactRepository.js")
const {
  foundMeetings,
  verifyMeetingFound,
  removeMeeting,
  replaceUpdatedMeeting
} = require("../../domain/meetings/meetingRepository.js")

const getAllMeetings = (req, res) => {
  res.json({
    meetings: meetings,
  })
}

const getMeetingById = (req, res) => {
  const id = Number(req.params.id)
  const result = foundMeetings(meetings, id)

  verifyMeetingFound(result, res, id)

  res.json({
    meeting: result,
  })
}

const deleteMeeting = (req, res) => {
  const id = Number(req.params.id)
  const result = foundMeetings(meetings, id)

  verifyMeetingFound(result, res, id)

  removeMeeting(meetings, result)

  res.json({
    meeting: result,
  })
}

const updateMeeting = (req, res) => {
  const id = Number(req.params.id)
  const result = foundMeetings(meetings, id)
  const meeting = req.body

  verifyMeetingFound(result, res, id)

  verifyMeetingBody(meeting, res)

  const meetingIDs = {
    ...meeting,
    contactId: result.contactId,
    id: result.id,
  }

  replaceUpdatedMeeting(meetings, result, meetingIDs)

  res.json({
    meeting: meetingIDs,
  })
}

module.exports = {
  getAllMeetings,
  getMeetingById,
  deleteMeeting,
  updateMeeting
}
