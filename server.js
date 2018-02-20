var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var mj = require("./data/users.json");
var server = http.createServer();

server.on('request', function(req,res){
  console.log('request:', req.url);
  var q = url.parse(req.url, true);
 // true => query turned into an obj
  console.log(q.query.lname);
   if (req.method === 'GET' && req.url === "/"){

    fs.readFile('./form.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
      });
    }
  else if (req.method === 'POST' && req.url === '/'){
      var body ='';
      req.on('data', function(data){
        body += data.toString();
      });
      req.on('end', function(){
        var table = { table: []};
        var postObj = qs.parse(body);
        table.table.push(postObj);

        fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
          if (err) {
            console.log(err);
          }
          postObj = JSON.parse(data);
          table.table.push(postObj);
          var myJSON = JSON.stringify(table);
          fs.writeFile('./data/users.json', myJSON, 'utf8', function(err) {
            if (err){
              console.log(err);
            }
        });
        console.log(postObj);
        res.end();
      });
    });
  }
  else if (req.method === 'GET' && req.url === '/data/users.json') {
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.write(data);
  });
  }
  else if (req.method === 'GET' && req.url === '/users.html') {
    fs.readFile('./users.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      fs.readFile('./data/users.json', function(err, content) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      /*var obj = JSON.parse(content);
      var table = document.getElementById("table");
      var tb = document.getElementById("tbody");
      obj.forEach(function(item, index, arr) {
        var td = document.createElement("td");
        td.appendChild(createTextNode(item));
      })*/
      res.write(data);
      return res.end();
      });
    });
}
  else {
    res.writeHead(404); res.write('404 Error');
    res.end();
    }
});

server.listen(27222);
console.log('this is the test run system');
