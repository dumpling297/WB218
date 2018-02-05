function init() {
  createTable();
  createPuzzle();
  a = setInterval(checkCorrect,1000);
  numPuzzle();
}

//create the table date with for loops
function createTable(){
  var tr, row, col;
  var tt = document.getElementById("board");
  var tb = document.createElement("tbody");
  for(row=0; row<13; row++){
    //add the header of the row
    tr = document.createElement("tr");
    var m = document.createElement("th");
    m.id = 'r'+'i';
    tr.appendChild(document.createTextNode("0"))
    for (col=0; col<12; col++){
      //to allow eventlistener to use variables within scope
      (function() {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(""));
        td.classList.add("unmarked");
        td.id = 'r'+row+'c'+col;
        td.addEventListener("click",function() {
          if (td.classList.contains("marked")) {
            td.classList.add("unmarked")
            td.classList.remove("marked");
          }else {
            td.classList.add("marked");
            td.classList.remove("unmarked");
          }
        })
        tr.appendChild(td);
      }());
    }
    tb.appendChild(tr);
  }
  tt.appendChild(tb);
}

//create the puzzle with random generated numbers
function createPuzzle() {

  var tt = document.getElementById("board");
  for (var i=1;i<tt.rows.length;i++) {
    tr = tt.rows[i];
    var j = Math.floor(Math.random()*2); //begins at random number
    var k =Math.floor(Math.random()*7);
    //separate answer into 2 sections -- for breaks
    //first half of the rows
    for (j; j<k;j++) {
      var td = tt.rows[i].cells[j];
      td.classList.add("a");
    }
    //second half of the row
    k = k+j+1;
    var n =Math.floor(Math.random()*13)
    for (k; k<n;k++) {
      var td = tt.rows[i].cells[k];
      td.classList.add("a");
    }
   }
}

//give the top and left the required hint numbers
function numPuzzle() {
  var tt = document.getElementById("board");

  /*for (var i=0; i<=tt.rows[0].cells.length;i++){

    for(var j=i;j<tt.rows.length;j++){
      var arr= new Array();
      var td = tt.rows[j].cells[i];
      var count=0;

      if (td.classList.contains("a")){
        count+=1;
      } else if(count>0){
          arr.push(count)
          count=0;
        }
      if (j=tt.rows.length-1 && count>0){
         arr.push(count);
      }
    }
    for(var k=0;k<arr.length;k++){
      var id = "col"+i;
      console.log(id);
      console.log(arr);
      var thU = document.getElementById(id);
      thU.innerHTML = arr[k];
    }
  }*/
}
//checks if user has correct input; intervals of 1000
function checkCorrect() {
  var tt = document.getElementById("board").getElementsByTagName("tr");
  var ans = document.getElementsByClassName("a");
  var mark = document.getElementsByClassName("marked");

  //count the correct answer cells; "envy" counts the incorrect answers;
  var count=0, envy=0;
 for (var i=0; i<mark.length; i++){
   console.log(mark[i]);
   if(mark[i].classList.contains("a")){
     count+=1;
   }
   else {envy+=1;}
 }
 //add the correct and incorrect number of answers;
 count = count-envy;
  if (count==ans.length) {
    if(confirm("congratulations! You did it! :)")) {
      txt = "OK!";
      clearInterval(a);
    }
  }
}


//show the answer to the puzzle
function showAnswer() {
  var tt = document.getElementById("board").getElementsByTagName("tr");
  var ans = document.getElementsByClassName("a");
  for (var i=0; i<ans.length; i++) {
    ans[i].classList.add("yes");
  }

  clearInterval(a);
}


//reset table to current answer -- answer will be same as displayed
function tableReset(){
  var tt = document.getElementsByTagName("td");
  for (var i=0; i<tt.length;i++){
    tt[i].classList.add("unmarked");
    tt[i].classList.remove("yes","marked");
  }
}

//gives new puzzle to solve
function newPuzzle(){
  var tt = document.getElementsByTagName("td");
  for (var i=0; i<tt.length;i++){
    tt[i].classList.remove("a");
  }
  tableReset();
  createPuzzle();
}
