/*
//--HELLO--
console.log("hello1");
console.warn("don't do that!");
console.info("running app ...");
console.time('flag');   //timing this process

//defers the execution of a function until the next event loop iteration
//each iteration of an event loop is called a tick
process.nextTick(function() {
    console.log(console.timeEnd('flag'));
});
console.log("hello2");*/

/*
//--PROCESS--
//allows to take the part from the command line
console.log(process.argv);
var port = process.argv[2];
if (typeof(port) !== 'undefined') {
    console.log(`app is running on port: ${port}`);
}
*/

/*
//--STDIN--
//console input, output
var users = [];
function nextUser() {
    process.stdout.write('\n next user fname,lname,age: (exit to quit): ');
}
process.stdin.on('data', function(data) {
    if (data.toString().trim() !== 'exit') {
        users.push(data.toString().trim());
        nextUser();
    } else {
        process.exit();
    }
});
process.on('exit', function() {
    users.forEach(function(user) {
        process.stdout.write(user);
    })
});
nextUser();
*/

/*
//--PATH--
//allows to join paths to the directory
var path = require('path');
var pathObj = path.parse(__filename);
console.log(path.join(pathObj.dir, 'foo', 'bar'));
*/

/*
//--EXPORTS--
//requires the Users.js file
var user = require('./User.js');
var u1 = new user('Bobby', 'Chan', 24);
u1.fullName();
*/

/*
//inherits the prototype methods from one constructor into another
var events = require('events');
var EventEmitter = events.EventEmitter; //constructor
var util = require('util');
var User = function(fname,lname,age){ //constructor
   this.fname = fname;
   this.lname = lname;
   this.age = age;
 }
util.inherits(User,EventEmitter);
//User inherits from EventEmitter
var u1 = new User('Bobby','Chan',24);
u1.on('poke', function(says){
  console.log(`${this.fname}: says ${says}`);
});
u1.emit('poke', 'HEY! What the @#$%');
//u1.removeListener('poke', callback);
*/

/*
//filesync not working
var path = require('path');
var fs = require('fs');
var fileName = process.argv[2];
var filePath = path.join(__dirname, fileName);
console.log(filePath);
var contents = fs.readFileSync(filePath);
console.log(contents.toString());
*/


var cp = require('child_process');
var os = require('os');
if (os.platform() === 'win32') {
    cp.execFile('hello.bat', ['Bobby'], function(err, stdout, stderr) {
        console.log(stdout);
    });
} else if (os.platform() === 'linux' || os.platform() === 'darwin') {
  // linux commands
}
