var time = 0;
var a; //
var startTime;

function runCommand(){
time++;
var x = document.getElementsByTagName('h1')[0]; //
var timeSinceClick = new Date() - startTime; //
var secondsTotal = Math.floor(timeSinceClick / 1000); //
var minutes = Math.floor(secondsTotal / 60) % 3600; //changes seconds
var seconds = Math.floor(secondsTotal) % 60;  //this return 1,2,3,4....
//var minutes = Math.floor(time / 60) % 3600;
//var seconds = Math.floor(time) % 60;
x.innerHTML = minutes + ":" + seconds;
}

function setInt(){ //
startTime = new Date();
a = setInterval(runCommand,1000); }

function stopInt(){
clearInterval(a); }

function resetInt(){
time = 0;
document.getElementsByTagName('h1')[0].innerHTML = 0 + ":" + 0;
}
