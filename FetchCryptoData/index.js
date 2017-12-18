

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
            resolve(currency);
            request.post('http://localhost:8000/postAllCurrencies', {json: {curArray : currency}});
        
        debugger;
           
        });
     });
    
    }
    
    
    io.on('connection', (socket) =>{
        console.log('user is connected');
        getData().then((bigD) => {
            debugger;
                socket.emit('getData', bigD)
        })
        setInterval(()=>{
        getData().then((bigD) => {
            debugger;
                socket.emit('getData', bigD)
        })
    
        },300000);
        socket.on("disconnect", ()=>{
            console.log('Got disconnect!');
            
        })
    });
    
        
    io.listen(1234);
