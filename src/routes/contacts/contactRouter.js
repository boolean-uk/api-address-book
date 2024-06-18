const express = require("express")
const router = express.Router()

const {
  getAllContacts,
  createContact,
  getContactById,
  deleteContact,
  updateContact,
  getContactMeetings,
  createContactMeeting
} = require("../../controllers/contacts/contactControllers")

router.get("/", getAllContacts)

router.post("/", createContact)

router.get("/:id", getContactById)

router.delete("/:id", deleteContact)

router.put("/:id", updateContact)

router.get("/:id/meetings", getContactMeetings)

router.post("/:id/meetings", createContactMeeting)

module.exports = router
