//USING AJAX AND jquery
//updated asynchronously -- can update parts of pages


$(document).ready(function(){
  console.log("calling GET /users-api");
  //page reload with existing list
  $.ajax({
    method: 'get',
    url: '/users-api',
    data: '',
    success: printUsers
  });
});


function printUsers(data){
  $('body>ul').empty();
  $.each(data, function(){
    $('<li>').html(this.fname+" "+this.lname+" <span> &otimes; </span>").appendTo('body>ul');
  });
  $('span').off('click').click(function(){

    var name = $(this).parent().text().split(" ");
    $.ajax({
      method: 'delete',
      url: '/users-api/'+name[0],
      data: 'fname='+name[0]+'&lname='+name[1],
      success: printUsers
    });
    window.location.href=window.location.href;
  });
}

function addUsers(){
    $.ajax({
    method: 'post',
    url: '/users-api',
    data: 'fname='+$('#fname').val()+'&lname='+$('#lname').val(),
    success: printUsers
  });
}
