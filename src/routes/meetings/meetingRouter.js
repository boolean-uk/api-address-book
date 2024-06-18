const express = require("express")
const router = express.Router()

const {
  getAllMeetings,
  getMeetingById,
  deleteMeeting,
  updateMeeting
} = require("../../controllers/meetings/meetingControllers")

router.get("/", getAllMeetings)

router.get("/:id", getMeetingById)

router.delete("/:id", deleteMeeting)

router.put("/:id", updateMeeting)

module.exports = router
