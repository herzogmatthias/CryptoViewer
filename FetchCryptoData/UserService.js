var request = require('request')
var io = require('socket.io')()
var intervalid = 0;

function getData() {
    return new Promise((resolve,reject) => {
    debugger;
      request('http://localhost:8000/getCurrencies', function (error, response, body) {
        if(error)
            reject();
            
            var currency = JSON.parse(body);
            //console.log(body)
            resolve(currency);
        debugger;
           
        });
     });
    
    }
    io.on('connection', (socket) =>{
        console.log('user is connected');
        getData().then((bigD) => {
            console.log(bigD)
            debugger;
                socket.emit('getData', bigD)
        })
        setInterval(()=>{
        getData().then((bigD) => {
            debugger;
            console.log(bigD)
                socket.emit('getData', bigD)
        })
    
        },300000);
        socket.on("disconnect", ()=>{
            console.log('Got disconnect!');
            
        })
    });
    io.listen(1233);