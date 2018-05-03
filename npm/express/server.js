//LAB4
//node-dev : automatically restarts when chnages are made
//users - api
//middleware to respond to HTTP request
//defines routing table for different actions based on HTTP method and URL
var express = require('express');
var app = express();
//returns middleware that serves an index of the directory in a given path
var serverIndex = require('serve-index');
var http = require('http');
var port = process.env.PORT || 3000;
var users = []; // parsing body


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: "start.html"
}

app.use('/', function(req, res, next) {
    console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
    next();
});

app.all('/', function(req, res, next) {
    console.log('Accessing root folder');
    next();
});

app.use('/', express.static('./pub_html', options));


app.get('/users-api', function(req, res, next) {
    //serve users as json
    res.json(users);
});

app.post('/users-api', function(req, res, next) {
    console.log(req.body);
    users.push(req.body);
    res.json(users);
});

app.delete('/users-api/:id', function(req, res, next) {
    //search database for id
    users = users.filter(function(people) {
        return ((people.fname !== req.body.fname) || (people.lname !== req.body.lname));
    });
    res.json(users);
});


http.createServer(app).listen(port);
console.log('running on port', port);
