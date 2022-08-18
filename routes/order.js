const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(db.database)

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orders (orderId VARCHAR(255) PRIMARY KEY, date DATE , customerId Varchar(255))"
        connection.query(userTableQuery, function(err,result){
            if(result.warningCount === 0){
                console.log('order table created');
            }
        })
    }
})
router.post('/',(req, res) =>{
    const orderId = req.body.orderId
    const date = req.body.date
    const customerId = req.body.customerId
    var query = "INSERT INTO orders (orderId, date, customerId) VALUES (?,?,?)"
    connection.query(query, [orderId, date, customerId], (err) =>{
        if(err){
            res.send({"message" : "duplicate entry"})
        }else{
            res.send({"message" : "order successfully added!"})
        }
    })
})
router.get('/',(req, res) =>{
    var query = "SELECT * FROM orders"
    connection.query(query,(err,rows) =>{
        if(err) throw err
        res.send(rows)
    })
})
router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "SELECT * FROM orders WHERE orderId=?"
    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);
        res.send(rows)
    })
})

router.put('/',(req, res) =>{
    const orderId = req.body.orderId
    const date = req.body.date
    const customerId = req.body.customerId
    var query = "UPDATE orders SET date=?, customerId=? WHERE orderId=?"
    connection.query(query, [date, customerId, orderId], (err,rows) =>{
        if(err) console.log(err);
        if(rows.affectedRows > 0){
            res.send({'message' : 'order Updated'})
        }else{
            res.send({'message' : 'order not found'})
        }
    })
})

router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "DELETE FROM orders WHERE orderId=?";
    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);
        if (rows.affectedRows > 0) {
            res.send({ 'message': 'order deleted' })
        } else {
            res.send({ 'message': 'order not found' })
        }
    })
})
module.exports = router;