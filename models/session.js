const db = require("../database/db.js");

const Session = {
	login: (email) => {
		const sql = `SELECT * FROM users WHERE email = $1`;
		return db.query(sql, [email]).then((dbRes) => dbRes.rows);
	},
};

module.exports = Session;
