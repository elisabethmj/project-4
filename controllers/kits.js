const express = require("express");
const router = express.Router();
const Kits = require("../models/kits");

router.get("/", (req, res) => {
	const userId = req.session.userid;

	if (!userId) {
		return res.status(401).send({ message: "Not logged in" });
	}

	Kits.getAllForUser(userId).then((kitRows) => res.json(kitRows));
});

router.get("/:id", (req, res) => {
    const kitId = req.params.id;
	const userId = req.session.userid;

	if (!userId) {
		return res.status(401).send({ message: "Not logged in" });
	}

	Kits.getOneForUser(kitId, userId).then((kitRows) => res.json(kitRows));
});

// router.delete("/:id", (req, res) => {
// 	const kitId = req.params.id;
// 	Kits.deleteOne(kitId)
// 		.then(() => res.json({ success: true }))
// 		.catch((error) => {
// 			res.status(500).json({ message: "kit does not exist" });
// 		});
// });

router.post("/", (req, res) => {
    //if you are working on the holidays page,
    //change this to a hard coded id
    //i.e. userId = 1;
    const userId = req.session.userid;

    if (!userId) {
		return res.status(401).send({ message: "Not logged in!" });
	}

    //just creates the variables of the following names with their respective values
    const { user_kit_id, product, order_status, batch_number, expiry, mL_left_bottle } = req.body;

    if(user_kit_id === ''
        || product === '' 
        || order_status === '' 
        || batch_number === '' 
        || expiry === '' 
        || mL_left_bottle === '') {
            return res.status(400).json({ message: 'Please fill in the entire form.' });
        }

    //this just stores the req.body contents within the data object
    // i.e. data = {
    // userId: 1,
    // holiday_name: 'Paris'
    // date_start: '1997-07-28'
    //etc...etc...
    // }
    const data = { userId, ...req.body };

    Kits.add(data)
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).json({ success: false }));
});

router.put("/:id", (req, res) => {
    //if you are working on the holidays page,
    //change this to a hard coded id
    //i.e. userId = 1;
    const userId = req.session.userid;

    if (!userId) {
		return res.status(401).send({ message: "Not logged in!" });
	}

    //just creates the variables of the following names with their respective values
    const { user_kit_id, product, order_status, batch_number, expiry, mL_left_bottle } = req.body;
    const kit_id = req.params.id;

    if(user_kit_id === ''
        || product === '' 
        || order_status === '' 
        || batch_number === '' 
        || expiry === '' 
        || mL_left_bottle === '') {
            return res.status(400).json({ message: 'Please fill in the entire form.' });
        }

    //this just stores the req.body contents within the data object
    // i.e. data = {
    // userId: 1,
    // holiday_name: 'Paris'
    // date_start: '1997-07-28'
    //etc...etc...
    // }
    const data = { kit_id, ...req.body };

    Kits.edit(data)
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).json({ success: false }));
});

//these are for testing via Postman
// router.get("/getAll", (req, res) => {
// 	Kits.getAll().then((kitRows) => res.json(kitRows));
// });

// router.get("/getOne/:id", (req, res) => {
// 	Kits.getOne(req.params.id).then((kitRows) => res.json(kitRows));
// });

module.exports = router;
