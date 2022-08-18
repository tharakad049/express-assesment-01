const express = require('express')
const app = express()
const port = 4000
const customer = require('./routes/customer')
const item = require('./routes/item')
const order = require('./routes/order')

app.use(express.json())

app.use('/customer', customer)
app.use('/item', item)
app.use('/order', order)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

