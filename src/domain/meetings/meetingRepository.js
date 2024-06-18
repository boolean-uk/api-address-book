const foundMeetings = (meetings, id) => {
  return meetings.find((meeting) => meeting.id === id)
}

const verifyMeetingFound = (result, res, id) => {
  if (!result) {
    return res.status(404).send({
      message: `meeting with id of ${id} not found.`,
    })
  }
}

const removeMeeting = (meetings, result) => {
  return meetings.splice(meetings.indexOf(result), 1)
}

const replaceUpdatedMeeting = (meetings, result, meetingIDs) => {
  return meetings.splice(meetings.indexOf(result), 1, meetingIDs)
}

module.exports = {
  foundMeetings,
  verifyMeetingFound,
  removeMeeting,
  replaceUpdatedMeeting
}
