const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const HTTPCodes = require("simple-http-codes");
const contacts = require("../data/contacts");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// write your app code here
app.get("/contacts", (req, res) => {
	res.status(HTTPCodes.default.Success.OK).json({ contacts });
});

app.post("/contacts", (req, res) => {
	const contact = {
		id: contacts[contacts.length - 1]?.id + 1 || 0,
		...req.body,
	};
	contacts.push(contact);
	res.status(HTTPCodes.default.Success.CREATED).json({ contact });
});

app.get("/contacts/:id", (req, res) => {
	const contact = contacts.find((e) => e?.id == req.params.id);
	res.status(HTTPCodes.default.Success.OK).json({ contact });
});

app.delete("/contacts/:id", (req, res) =>
	res.status(HTTPCodes.default.Success.OK).json({
		contact: contacts.splice(
			contacts.findIndex((e) => e?.id == req.params.id),
			1
		)[0],
	})
);

app.put("/contacts/:id", (req, res) => {
	const idx = contacts.findIndex((e) => e?.id == req.params.id),
		contact = idx >= 0 && { ...contacts[idx], ...req.body };

	console.log(contact);

	if (!contact) return res.status(402).json("Could not find contact");

	contacts.splice(idx, 1, contact);

	res.status(HTTPCodes.default.Success.OK).json({ contact });
});

module.exports = app;
