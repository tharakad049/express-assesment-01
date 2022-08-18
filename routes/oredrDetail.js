const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const connection = mysql.createConnection(db.database)


connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orderDetail (orderId VARCHAR(255) PRIMARY KEY, itemCode VARCHAR(255), orderQty int(10), unitPrice DOUBLE)"
        connection.query(userTableQuery, function(err,result){
            if(result.warningCount === 0){
                console.log('order detail table created');
            }
        })
    }
})

router.post('/',(req, res) =>{
    const orderId = req.body.orderId
    const itemCode = req.body.itemCode
    const orderQty = req.body.orderQty
    const unitPrice = req.body.unitPrice
    var query = "INSERT INTO orderDetail (orderId, itemCode, orderQty, unitPrice) VALUES (?,?,?,?)"
    connection.query(query, [orderId, itemCode, orderQty, unitPrice], (err) =>{
        if(err){
            res.send({"message" : "duplicate entry"})
        }else{
            res.send({"message" : "order detail successfully added!"})
        }
    })
})

router.get('/',(req, res) =>{
    var query = "SELECT * FROM orderDetail"
    connection.query(query,(err,rows) =>{
        if(err) throw err
        res.send(rows)
    })
})

router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "SELECT * FROM orderDetail WHERE orderId=?"
    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);
        res.send(rows)
    })
})

router.put('/',(req, res) =>{
    const orderId = req.body.orderId
    const itemCode = req.body.itemCode
    const orderQty = req.body.orderQty
    const unitPrice = req.body.unitPrice
    var query = "UPDATE orderDetail SET itemCode=?, orderQty=?, unitPrice=? WHERE orderId=?"
    connection.query(query, [itemCode, orderQty, unitPrice, orderId], (err,rows) =>{
        if(err) console.log(err);
        if(rows.affectedRows > 0){
            res.send({'message' : 'order detail Updated'})
        }else{
            res.send({'message' : 'order detail not found'})
        }
    })
})

router.delete('/:orderId', (req, res) => {
    const orderId = req.params.orderId
    var query = "DELETE FROM orderDetail WHERE orderId=?";
    connection.query(query, [orderId], (err, rows) => {
        if (err) console.log(err);
        if (rows.affectedRows > 0) {
            res.send({ 'message': 'order detail deleted' })
        } else {
            res.send({ 'message': 'order detail not found' })
        }
    })
})
module.exports = router;