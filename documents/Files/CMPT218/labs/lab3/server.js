var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var server = http.createServer();

server.on('request', function(req,res){
  console.log('request:', req.url);
  var q = url.parse(req.url, true);
 // true => query turned into an obj
  console.log(q.query.lname);
   if (req.method === 'GET' && req.url === "/"){

     //only this scope required
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
      });
    }
  else if (req.method === 'GET' && req.url.match(/^\/.+\.jpg$/)){
      var imgpath = path.join(__dirname,req.url);
      var imgstream = fs.createReadStream(imgpath, { highWaterMark: 1024 });
      res.writeHead(200, {"Content-Type": "image/jpeg"});
      imgstream.pipe(res);
  }
  else if (req.method === 'POST' && req.url === '/'){
      var body =''; req.on('data', function(data){ body += data.toString(); });
      req.on('end', function(){ var postObj = qs.parse(body);
      console.log(postObj); res.end(); }); }
      else {
      /*  res.writeHead(404); res.write('404 Error');
        res.end()*/
    }
});

server.listen(8080);
