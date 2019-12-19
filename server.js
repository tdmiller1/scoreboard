var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server running...")

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    if(connections.length > 1){
        console.log("SORRY NO MORE USERS")
    }else{
        connections.push(socket);
        console.log('Connected: %s sockets connected', connections.length);
    
        socket.on('disconnect', function(data){
            connections.splice(connections.indexOf(socket), 1);
            console.log("Disconnected: %s socket connected", connections.length)
        });
    
        socket.on('player1', function(data){
            console.log(data);
            io.sockets.emit('player1', {msg: data});
        });

        socket.on('player2', function(data){
            console.log(data);
            io.sockets.emit('player2', {msg: data});
        });
    }
    
});