const express = require("express");
const router = express.Router();
const { generateHash } = require("../utils/hash");
const Signup = require("../models/signup");

// signup stuff
router.post("/", (req, res) => {
	// console.log(req.body)
	let { firstname, surname, email, password, dob, is_staff, date_of_last_review, referral_expiry } = req.body;
	firstname = firstname.toLowerCase();
	surname = surname.toLowerCase();
	email = email.toLowerCase();
    // add for dob, is_staff, review date & expiry??

	if (!firstname || !surname || !email || !password || !dob || !is_staff) {
		return res.status(400).json({ message: "one of the fields is empty" });
	}

	const hashedPassword = generateHash(password);

	Signup.newAcc(firstname, surname, email, hashedPassword, dob, is_staff, date_of_last_review, referral_expiry)
		.then(() => res.status(200).json({ success: true }))
		.catch((err) => {
			// console.log(err);
			if (err.code === "23505") {
				res
					.status(400)
					.json({ message: "Sorry, this username or email is already taken" });
			} else {
				res.sendStatus(500);
			}
		});
});

router.get("/", (req, res) => {
	const sessionId = req.session.userid;
	const email = req.session.email;

	if (!sessionId || !email) {
		return res.status(401).send({ message: "Not logged in" });
	}

	Signup.getInfo(sessionId)
		.then((dbRes) => res.status(200).send(dbRes[0]))
		.catch((err) => res.status(500).send(err));
});

router.put("/:userId", (req, res) => {
	const savedId = req.session.userid;
	const pathId = req.params.userId;
	let { firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry } = req.body;
	firstname = firstname.toLowerCase();
	surname = surname.toLowerCase();
	email = email.toLowerCase();

	if (!savedId) {
		return res.status(401).send({ message: "Not logged in" });
	}

	if (savedId != pathId) {
		return res.status(401).json({});
	}

	Signup.checkEmail(email)
		.then((dbRes) => {
			// check if the email exists in the table or if it's matching the current one then continue
			if (dbRes.length == 0 || dbRes[0].email === email) {
			    Signup.saveInfo(pathId, firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry)
					.then((dbRes) => {
							        res
								        .status(200)
								        .json({ message: "New user settings have been saved" });
					                })
								.catch((err) => res.status(500).json({ message: err }));
						} else {
							return res.status(400).json({ message: "email already exists" });
						}
					})
					.catch((err) => {
						// console.log(err);
						return res.status(400).json({ message: err });
					});
		
});

module.exports = router;
