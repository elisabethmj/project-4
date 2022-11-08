const db = require("../database/db.js");

const Signup = {
	newAcc: (firstname, surname, email, hashedPassword, dob, is_staff, date_of_last_review, referral_expiry) => {
		const sql = `INSERT INTO users(firstname, surname, email, password, dob, is_staff, date_of_last_review, referral_expiry) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
		return db
			.query(sql, [firstname, surname, email, hashedPassword, dob, is_staff, date_of_last_review, referral_expiry])
			.then((dbRes) => dbRes);
	},
	getInfo: (sessionId) => {
		const sql = "SELECT id, firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry FROM users WHERE id = $1";
		return db
			.query(sql, [sessionId])
			.then((dbRes) => dbRes.rows)
			.catch((err) => err);
	},
	saveInfo: (userId, firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry) => {
		const sql = `UPDATE users SET firstname=$2, surname=$3, email=$4, dob=$5, is_staff=$6, date_of_last_review=$7, referral_expiry=$8 WHERE id=$1`;
		return db
			.query(sql, [userId, firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry])
			.then((dbRes) => dbRes)
			.catch((err) => {
				return err;
			});
	},
	checkEmail: (email) => {
		const sql = "SELECT email FROM users WHERE email=$1";
		return db
			.query(sql, [email])
			.then((dbRes) => {
				return dbRes.rows;
			})
			.catch((err) => {
				return err;
			});
	},
	searchUsers: (query) => {
		const sql = "SELECT id, firstname, surname, email, dob, is_staff, date_of_last_review, referral_expiry FROM users WHERE firstname ILIKE $1 OR surname ILIKE $1";
		return db
			.query(sql, [query])
			.then((dbRes) => dbRes.rows)
			.catch((err) => {
				return err;
			});
	} 
};

module.exports = Signup;