
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(8080);

var io = require('socket.io')(server);
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "chat.html"
}

app.use('/', express.static('./files', options));

io.on('connection', function(socket){
  //io.engine.clientsCount will give the number of currently connected users
  socket.emit('clientChange',io.engine.clientsCount);
  socket.broadcast.emit('clientChange',io.engine.clientsCount);

  socket.on('chat', function(message){
    //printed to client as well through script 
    socket.broadcast.emit('message',message);
  });

  socket.on('disconnect', function(){
    console.log('Disconnect event');
    socket.emit('clientChange',io.engine.clientsCount);
    socket.broadcast.emit('clientChange',io.engine.clientsCount);
  });

  socket.emit("message", "You're connected!!!");

});

console.log("app running on 8080");
