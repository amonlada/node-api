var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const usersModel = require('../models/user');
//consrt ประกาศแล้วข้อมูลไม่เปลี่ยน
/* GET users listing. */
//getall
router.get('/',async function(req, res, next) {
try{
  const user = await usersModel.find()
  return res.status(200).send({
    data: user,
    message: 'Get All Success !',
    success: true
  })
}catch(err){
  return res.status(500).send({
    message: "GetAll fail",
    success: false,
  })
}
});
//getById
router.get('/getbyId/:id',async function(req, res, next) {
  try{
    let id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({
        message:'id invalid',
        success: false,
        error: ["id is not a ObjectId"],
      })
    }
    let user = await usersModel.findById(id)
    return res.status(200).send({
      data: user,
      message: ' Get User By Id success !',
      success: true
    })
  }catch(err){
    return res.status(500).send({
      message: err.message,
      success: false,
    })
  }
   
});

//post
router.post('/add',async function(req, res, next) {
  try{
    let body = req.body //มาเก็บ body ที่นำมาจากข้างนอก
    let new_user = new usersModel({
      username: body.username,
      password:body.password,
      name: body.name,
      lname: body.lname,
      age: body.age,
      sex: body.sex

    })
    let user = await new_user.save()
    return res.status(201).send({
      data: user,
      message: 'create User Success !'
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
  await usersModel.updateOne({_id: mongoose.Types.ObjectId(id)},
    {
    $set:{
      username: body.username,
      password:body.password,
      name: body.name,
      lname: body.lname,
      age: body.age,
      sex: body.sex
  }
 }
)
let user = await usersModel.findById(id)
return res.send({
  data:user,
  message: 'Update User Success !'
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
    await usersModel.deleteOne({
      id: mongoose.Types.ObjectId(id)})

      let user = await usersModel.find()
      return res.send({
        data: user,
        message: 'Delete User success !'
      })

  }catch(err){
  return res.status(500).send({
    message: "error",
    success: false,
  })
}
});

module.exports = router;
