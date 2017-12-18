const io = require('socket.io-client');
const socket = io('http://localhost:1234');

    socket.on('getData', (data) => console.log(data));