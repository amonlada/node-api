//เริ่มแรกไฟล์ในการแก้ไข 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//เอาไว้ใช้ในการ ลอก api ที่ยิงมา

require('dotenv').config()
//console.log(process.env.DB_HOST)เรียกใช้
//รีควัยไฟล์ เร้าเตอร์มาทำงาน
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');


const mongoose = require('mongoose')
const { DB_HOST ,DB_PORT, DB_NAME } = process.env

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
.then(()=>{
  console.log('connect success')
})
.catch((err)=>{
  console.log(err.message)
})

var app = express();
//ติดตั้งcors เพื่อให้host อื่นสามารถใช้งาน service ของเราได
var cors =require('cors')
//const verifyToken = require('./index')
app.use(cors())

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 //ส่วนในการกำหนดRout ใน api  ไฟล์
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/orders',ordersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
