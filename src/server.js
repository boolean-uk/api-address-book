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
	res.status(HTTPCodes.default.Success.OK).json(contacts);
});

app.post("/contacts", (req, res) => {
	contacts.push(req.body);
	res.status(HTTPCodes.default.Success.CREATED).json();
});

app.get("/contacts/:id", (req, res) => {
	const contact = contacts.find((e) => e?.id == req.params.id);
	res.status(HTTPCodes.default.Success.OK).json(contact);
});

app.delete(
	"/contacts/:id",
	(req, res) =>
		contacts.splice(
			contacts.findIndex((e) => e?.id == req.params.id),
			1
		) && res.status(HTTPCodes.default.Success.OK).json()
);

app.put(
	"/contacts/:id",
	(req, res) =>
		contacts.splice(
			contacts.findIndex((e) => e?.id == req.params.id),
			1,
			{
				...contacts.find((e) => e?.id == req.params.id),
				...req.body,
			}
		) && res.status(HTTPCodes.default.Success.OK).json()
);

module.exports = app;
