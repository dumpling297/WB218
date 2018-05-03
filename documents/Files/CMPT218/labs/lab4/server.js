// users-api
var express = require('express');
var app = express();
var serverIndex = require('serve-index');
var http = require('http');
var port = process.env.PORT || 8080;
var users = [];

// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "start1.html"
}

app.use('/', function(req,res,next){
  //check what the response is sending
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
 });

app.use('/', express.static('./pub_html', options));
app.use('/files', serverIndex('pub_html/files', {'icons': true}));
app.get('/users-api', function(req,res,next){
  // serve users as json
  res.json(users);
});

app.post('/users-api', function(req,res,next){
  console.log(req.body);
  //users array
  users.push(req.body);
  res.json(users);
});

//colon deals with id passed in post
//deletes one specific user
app.delete('/users-api/:id', function(req, res, next){
  //search database for id
  //currently mimiks the process

  //function variable- if true, deletes item
  //- takes values from every user in array
  users = users.filter(function(){
    return((people.Username !== req.body.Username) || (people.Password !== req.body.Password));
  });
  res.json(users);
});
http.createServer(app).listen(port);
console.log('running on port',port);
