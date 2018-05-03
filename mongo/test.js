
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/test";

MongoClient.connect(url, function(err, client){
  if (err) console.log(err);
  //console.log('connected');
  var database = client.db('test'); // use
  var collection = database.collection('documents'); // db.documents
  collection.insertMany([{a:1,b:2},{a:3,b:4}], function(err, result){
    collection.find().forEach(function(mydoc){
      console.log(mydoc);
    });

  });
});

//------------------------------------MONGOOSE
/*var mongoose = require('mongoose');

mongoose.connect("mongodb://root:root@ds213229.mlab.com:13229/cmpt218");
var db = mongoose.connection;

//db.on('error', function(){});
db.once('open', function(){
  console.log('connection success');
});

// Schema is a constructor
var Schema = mongoose.Schema;
// instantiate the constructor
var userSchema = new Schema({
  uname: { type:String },
  age: { type:Number, min:[0,'not born yet'], max:120 },
  password: { type:String, minlength:4 }
});
// create a new model
var User = mongoose.model('user', userSchema);

var Bobby = new User({
   uname: "bobbyc",
   age: -2,
   password: "password"
});

Bobby.save(function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Your user has been saved!");
  }
});
*/
