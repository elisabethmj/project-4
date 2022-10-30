const db = require("../database/db.js");

const Injections = {
    getAll: () => {
        const sql = 'SELECT * FROM injections';
        return db.query(sql).then((dbRes) => dbRes.rows );
    },
    getOne: (injectionId) => {
        const sql = `SELECT * FROM injections WHERE id = $1`;
        return db.query(sql, [injectionId]).then((dbRes) =>  dbRes.rows );
    },
    getOneForUser: (injectionId, userId) => {
        const sql = `SELECT * FROM injections WHERE id = $1 AND user_id = $2`;
        return db.query(sql, [injectionId, userId]).then((dbRes) => dbRes.rows); 
    },
    getAllForUser: (userId) => {
        const sql = `SELECT * FROM injections WHERE user_id = $1`;
        return db.query(sql, [userId]).then((dbRes) => dbRes.rows); 
    },
    deleteOne: (injectionId) => {
        const sql = `DELETE FROM injections WHERE id = $1`;
        return db.query(sql, [injectionId]).then((dbRes) => dbRes.rows);
    },
    add: (data) => {
        const dataArray = [];

        for(let item in data){
            dataArray.push(data[item]);
        }      

        const sql = `INSERT INTO injections (user_id, kit_id, user_inj_id, date_of_inj, dose_given_mL, reaction, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        return db.query(sql, dataArray)
        .then((dbRes) => {
            dbRes;
        }).catch((err) => {
            err;
        });
    },
    edit: (data) => {
        const dataArray = [];

        for(let item in data){
            dataArray.push(data[item]);
        } 

        const sql = `UPDATE injections SET kit_id = $2, user_inj_id = $3, date_of_inj = $4, dose_given_mL = $5, reaction = $6, notes = $7 WHERE id = $1`;
        return db.query(sql, dataArray)
        .then((dbRes) => {
            dbRes;
        }).catch((err) => {
            err;
        });
    }
};

module.exports = Injections;