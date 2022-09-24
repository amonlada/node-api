const mongoose = require('mongoose')
const products = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    price: Number,
    detail: Object,
    amount: Number

    
})

module.exports = mongoose.model('products',products)


//โมเดลสกีมม้า มองโก