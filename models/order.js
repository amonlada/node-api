const mongoose = require('mongoose')//ดึงมาใช้
const orders = new mongoose.Schema({ //

    order_id:Number,
    name: String,
    order_list: Object,
    order_number:Object,
    order_sum:Object,
    
    
})


module.exports = mongoose.model('orders',orders) //ส่งข้อมูลไปเก็บใน mongo