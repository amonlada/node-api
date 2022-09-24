var express = require('express');
var router = express.Router();
const ordersModel = require('../models/order')
const mongoose = require('mongoose')
const productModel = require('../models/product')

/* GET home page. กำหนดเมดตอล แต่เราตัวที่เราสร้าง
                     เขียนฟัง req res=เรสปอน */

//getall
router.get('/',async function(req, res, next) {
  try{
    let order = await ordersModel.find()
    return res.send({
      data: order,
      message: 'Get All success !'
    })
  }catch(err){
    return res.status(500).send({
      message: err.message
    })
  }
   
});
//getbyId
router.get('/:id',async function(req, res, next) {
    try{
      let id = req.params.id
  
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({
          message:'Id invalid'
        })
      }
      let order = await ordersModel.findById(id)
  
      return res.send({
        data: order,
        message: 'Get BY ID Success'
      })
    }catch(err){
      return res.status(500).send({
        message: err.message
      })
    }
     
  });
//create order
router.post('/add',async function(req, res, next) {
    try{
      let body = req.body //มาเก็บ body ที่นำมาจากข้างนอก
      let new_order = new ordersModel({

      order_id:body.order_id,
      name: body.name,
      order_list: body.order_list,
      order_number: body.order_number,
      order_sum: body.order_sum,

      })
      let order = await new_order.save()
      return res.status(201).send({
        data: order,
        message: 'create Order success !',

      })
    
    }catch(err){
      return res.status(500).send({
        message: "Create Order fail",
        success: false,
      })
    }   
  });
  //update
router.put('/:id',async function(req, res, next) {
    try{
    let id = req.params.id
    let body = req.body
  
    await ordersModel.updateOne(
      {_id: mongoose.Types.ObjectId(id)},
      {
      $set:{
        order_id:body.order_id,
        name: body.name,
        order_list: body.order_list,
        order_number: body.order_number,
        order_sum: body.order_sum,
    }
   }
  )
  let order = await ordersModel.findById(id)
  return res.send({
    data:order,
    message: 'Put Order success !'
  })
  }catch(err){
    return res.status(500).send({
      message: "Error",
      success: false,
    })
   } 
  });

  //delete order
  router.delete('/:id',async function(req, res, next) {
    try{
      let id = req.params.id
  
      await ordersModel.deleteOne({
        _id: mongoose.Types.ObjectId(id)})
  
        let order = await ordersModel.find()
        return res.send({
          data: order,
          message: 'Delete Order Success !'
        })
  
    }catch(err){
    return res.status(500).send({
      message: "Error",
      success: false,
    })
  }
    
  });


module.exports = router;
