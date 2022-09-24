var express = require('express');
var router = express.Router();
const productModel = require('../models/product')
const mongoose = require('mongoose')
/* GET home page. กำหนดเมดตอล แต่เราตัวที่เราสร้าง
                     เขียนฟัง req res=เรสปอน */

//getall
router.get('/',async function(req, res, next) {
  try{
    let products = await productModel.find()
    return res.send({
      data: products,
      message: 'Get All Success !'
    })
  }catch(err){
    return res.status(500).send({
      message: err.message
    })
  }
   
});

//รับค่าไอดีเข้ามา getbyid
router.get('/:id',async function(req, res, next) {
  try{
    let id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({
        message:'id invalid'
      })
    }
    let product = await productModel.findById(id)

    return res.send({
      data: product,
      message: 'Get ById Success !'
    })
  }catch(err){
    return res.status(500).send({
      message: err.message
    })
  }
   
});
//ส่งข้อมูลแบบคิวรี่ ข้อควรระวัง แก้ที่อินเด็ก
//post put รับ-ส่ง ตัวบอดี้ได้ 

//create product
router.post('/add',async function(req, res, next) {
  try{
    let body = req.body //มาเก็บ body ที่นำมาจากข้างนอก
    let new_product = new productModel({
    product_id: body.product_id,
    product_name: body.product_name,
    price: body.price,
    detail: body.detail,
    amount:body.amount,

    })
    let product = await new_product.save()
    return res.status(201).send({
      data: product,
      message: 'Create Product Success !'
    })
  
  
  }catch(err){
    return res.status(500).send({
      message: "Create fail",
      success: false,
    })
  }   
});

//update
router.put('/:id',async function(req, res, next) {
  try{
  let id = req.params.id
  let body = req.body

  await productModel.updateOne(
    {_id: mongoose.Types.ObjectId(id)},
    {
    $set:{
      product_id: body.product_id,
      product_name: body.product_name,
      price: body.price,
      detail: body.detail,
      amount:body.amount,
  }
 }
)
let product = await productModel.findById(id)
return res.send({
  data:product,
  message: 'Put Product Success !'
})
}catch(err){
  return res.status(500).send({
    message: "error",
    success: false,
  })
 } 
});

//delete
router.delete('/:id',async function(req, res, next) {
  try{
    let id = req.params.id

    await productModel.deleteOne({
      _id: mongoose.Types.ObjectId(id)})

      let product = await productModel.find()
      return res.send({
        data: product,
        message: 'Delete Product Success !'
      })

  }catch(err){
  return res.status(500).send({
    message: "Error",
    success: false,
  })
}
  
});

module.exports = router;
