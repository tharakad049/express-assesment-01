const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(db.database)


connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected mysql");
        var cusTable = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address TEXT, salary DOUBLE)"
        connection.query(cusTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("table created");
            }
        })
    }
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const salary = req.body.salary;

    var saveQuery = "INSERT INTO customer(id,name,address,salary) VALUES(?,?,?,?)";

    connection.query(saveQuery, [id, name, address, salary], (err) => {
        if (err) {
            res.send({ "message": "Duplicate entry" })
        } else {
            res.send({ "message": "Customer saved" })
        }
    })
})
router.get('/', (req, res) => {
    var getAllQuery = "SELECT * FROM customer";
    connection.query(getAllQuery, (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    var searchQuery = "SELECT * FROM customer WHERE id=?"
    connection.query(searchQuery, [id], (err, row) => {
        if (err) console.log(err);
        res.send(row);
    })
})
router.put('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const salary = req.body.salary

    var Query = "UPDATE customer SET name=?, address=?, salary=? WHERE id=?";
    connection.query(Query, [name, address, salary, id], (err, rows) => {
        if (err) console.log(err);
        if (rows.affectedRows > 0) {
            res.send({ "message": "customer updated" })
        } else {
            res.send({ "message": "customer not found" })
        }
    })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    var deleteQuery = "DELETE FROM customer WHERE id=?";

    connection.query(deleteQuery, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({ "message": "customer deleted" })
        } else {
            res.send({ "message": "customer not found" })
        }
    })
})
module.exports = router;