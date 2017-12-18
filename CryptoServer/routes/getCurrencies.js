var express = require('express');
var request = require('request')
var cors = require('cors')

var router = express.Router();
router.use(cors())

let currency = [];
router.get('/', function(req, res){
    request(' https://api.coinmarketcap.com/v1/ticker/', function (error, response, body) {
      
      for(let i in currency){
        //console.log('body:', currency[i].name);
      }
        
        res.send(body); // Print the HTML for the Google homepage.
      });
    
  });
  module.exports = router;