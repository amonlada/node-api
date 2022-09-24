var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page.  */
router.get('/login',async function(req, res, next) {
  
let paylode= {
  name: 'bb',
  role: 'admin'
}
let token = await jwt.sign(paylode,'KEY')
res.send({
  token: token
})
});

const detoken =(req,res,next)=>{
  const token = req.headers.authorization.split("Bearer")[1]
  const detoken = jwt.verify(token,'KEY')

  if(detoken.role === 'admin'){
    next()
  }else{
    res.send({
      message: 'not admin'
    })
  }
}

router.get('/detoken',async function(req, res, next) {
 // const token = req.headers.authorization.split("Bearer")[1]
  
  //const detoken = jwt.verify(token,'KEY')

  res.send({
    message: 'hello'
  })
  });

module.exports = router;
