var fs = require('fs');

//accessing a particular file 
function fileObj(name) {
    this.fileName = name;
    this.readIt = function() {
        console.log('opening...');
        fs.readFile(this.fileName, 'UTF-8', function(err, contents) {
            if (err) {
                console.log(`Can't open ${this.fileName}`);
                return;
            } else {
                console.log('got it!');
                return; // a handle
            }
        });
    }
}
var fo = new fileObj('form.html');
fo.readIt();
