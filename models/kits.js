const db = require("../database/db.js");

const Kits = {
    getAll: () => {
        const sql = 'SELECT * FROM kits';
        return db.query(sql).then((dbRes) => dbRes.rows );
    },
    getOne: (kitId) => {
        const sql = `SELECT * FROM kits WHERE id = $1`;
        return db.query(sql, [kitId]).then((dbRes) =>  dbRes.rows );
    },
    getOneForUser: (kitId, userId) => {
        const sql = `SELECT * FROM kits WHERE id = $1 AND user_id = $2`;
        return db.query(sql, [kitId, userId]).then((dbRes) => dbRes.rows); 
    },
    getAllForUser: (userId) => {
        const sql = `SELECT * FROM kits WHERE user_id = $1`;
        return db.query(sql, [userId]).then((dbRes) => dbRes.rows); 
    },
    deleteOne: (kitId) => {
        const sql = `DELETE FROM kits WHERE id = $1`;
        return db.query(sql, [kitId]).then((dbRes) => dbRes.rows);
    },
    add: (data) => {
        const dataArray = [];

        for(let item in data){
            dataArray.push(data[item]);
        }      

        const sql = `INSERT INTO kits (user_id, user_kit_id, product, order_status, batch_number, expiry, mL_left_bottle) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
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

        const sql = `UPDATE kits SET user_kit_id = $2, product = $3, order_status = $4, batch_number = $5, expiry = $6, mL_left_bottle = $7 WHERE id = $1`;
        return db.query(sql, dataArray)
        .then((dbRes) => {
            dbRes;
        }).catch((err) => {
            err;
        });
    }
};

module.exports = Kits;