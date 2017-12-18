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

var router = express.Router({mergeParams:true});
router.use(cors())

let currency = [];
router.get('/', function(req, res){
    console.log(req.params.id)
    dbPool.getConnection((err, connection)=>{
        console.log(req.params.id)
        connection.query('SELECT * FROM cryptocur where name = ? and Extract(DAY from dateval) = Extract(DAY FROM Sysdate())',req.params.id, (err,results) =>{
            currency = []
            for(let i in results){
              currency.push(new cryptocurrency(results[i].name, results[i].price_usd, results[i].symbol, results[i].dateval));
            }
            console.log(currency)
              connection.release();
              //console.log(students[0]);
              res.send(currency);
        })
    })

    });
    class cryptocurrency{
        constructor(name, price_usd, symbol, dateval){
            this.name = name;
            this.price_usd = price_usd;
            this.symbol = symbol;
            this.dataval = dateval;
        }
    }
  module.exports = router;