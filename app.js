const express = require('express')
const app = express()
const port = 4000
const customer = require('./routes/customer')
const item = require('./routes/item')
const order = require('./routes/order')
const orderDetail = require('./routes/oredrDetail')


app.use(express.json())

app.use('/customer', customer)
app.use('/item', item)
app.use('/order', order)
app.use('/orderDetail', orderDetail)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

