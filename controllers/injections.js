const express = require("express");
const router = express.Router();
const Injections = require("../models/injections");

router.get("/:id", (req, res) => {
	const userId = req.session.userid;
    const patientId = req.params.id;

	if (!userId) {
		return res.status(401).send({ message: "Not logged in" });
	}

	Injections.getAllForUser(patientId).then((injRows) => res.json(injRows));
});

// router.get("/:id", (req, res) => {
//     const injId = req.params.id;
// 	const userId = req.session.userid;

// 	if (!userId) {
// 		return res.status(401).send({ message: "Not logged in" });
// 	}

// 	Injections.getOneForUser(injId, userId).then((injRows) => res.json(injRows));
// });

router.delete("/:id", (req, res) => {
	const injId = req.params.id;
	Injections.deleteOne(injId)
		.then(() => res.json({ success: true }))
		.catch((error) => {
			res.status(500).json({ message: "kit does not exist" });
		});
});

router.post("/", (req, res) => {
    const userId = req.session.userid;

    if (!userId) {
		return res.status(401).send({ message: "Not logged in!" });
	}

    //just creates the variables of the following names with their respective values
    const { kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction, notes } = req.body;

    if(kit_id === ''
        || user_inj_id === '' 
        || date_of_inj === '' 
        || dose_given_mL === '' 
        || reaction === '' 
        || notes === '') {
            return res.status(400).json({ message: 'Please fill in the entire form.' });
        }

    
    const data = { userId, ...req.body };

    Injections.add(data)
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).json({ success: false }));
});

router.put("/:id", (req, res) => {
    const userId = req.session.userid;

    if (!userId) {
		return res.status(401).send({ message: "Not logged in!" });
	}

    const { kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction, notes } = req.body;
    const injId = req.params.id;

    if(kit_id === ''
            || user_inj_id === '' 
            || date_of_inj === '' 
            || dose_given_mL === '' 
            || reaction === '' 
            || notes === '') {
                return res.status(400).json({ message: 'Please fill in the entire form.' });
            }

    
    const data = { injId, ...req.body };

    Injections.edit(data)
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).json({ success: false }));
});

//these are for testing via Postman
// router.get("/getAll", (req, res) => {
// 	Injections.getAll().then((kitRows) => res.json(kitRows));
// });

// router.get("/getOne/:id", (req, res) => {
// 	Injections.getOne(req.params.id).then((kitRows) => res.json(kitRows));
// });

module.exports = router;
