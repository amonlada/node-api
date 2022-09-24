const mongoose = require('mongoose')//ดึงมาใช้
const users = new mongoose.Schema({ //

    username: String,
    password: String,
    name: String,
    lname: String,
    age: Number,
    sex: String

})

module.exports = mongoose.model('users',users) //ส่งข้อมูลไปเก็บใน mongo