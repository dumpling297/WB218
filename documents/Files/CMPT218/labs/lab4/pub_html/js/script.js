$(document).ready(function(){
  console.log("ready function");
  $.ajax({
    method: 'get',
    url: '/users-api',
    data: '',
    success: printUsers });
   });

function printUsers(data){
  $('body>ul').empty();
  $.each(data, function(){
    //otimes allows to put x beside value
    //when clicked on x -- delete user
   $('<ul>').html(this.Username+" "+this.Password+"<span>&otimes;</span>").appendTo('body>ul');
  });
  $('span').off('click').click(function(){
    //grab the parent -- span to list -- collect the data
    //have result be name array
    var name = $(this).parent().text().split(" ");
    $.ajax({
      method: 'delete',
      url: '/users-api'+name[0],
      data: 'Username=' + $('#Username').val()+'&Password='+$('#Password'),
      success: printUsers });
     });
  });
 }


function addUser() {
  $ajax({
    method: 'get',
    url: '/users-api',
    data: 'Username=' + $('#Username').val()+'&Password='+$('#Password'),
    success: printUsers
  })
}
