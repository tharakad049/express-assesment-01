const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(db.database)


connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("table created");
            }
        })

module.exports = router;