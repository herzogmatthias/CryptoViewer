let mysql = require('mysql')
let dbPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cryptocurrency'
});

var express = require('express');
var cors = require('cors')

var router = express.Router();
router.use(cors())

/* GET home page. */
router.post('/', function(req, res, next) {
  dbPool.getConnection((err, connection)=>{
    var crypto = [];
      if(err){
          console.log(err);
      }
      
      console.log(req.body.curArray)
      //console.log('1', req.body);
      for(index in req.body.curArray){
          console.log(req.body.curArray[index].name)
        crypto.push([new Date(), req.body.curArray[index].name, req.body.curArray[index].price_usd, req.body.curArray[index].symbol]);
        console.log('Hello: ', crypto);
      }
        connection.query('Insert into cryptocur(dateval, name, price_usd, symbol) values ?', [crypto], () =>{
              connection.release();
  
              
        })
      
      res.send("insert successfull");
      
  })
});

module.exports = router;