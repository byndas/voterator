var main = function() {
  var num = 3;
  $("#addoption").on("click",function(){
    $('#opt'+ num).removeClass('hidden');
    $('#opt'+ num).addClass('form-control');
    num++;
    disableSbmt();
  });
  
function disableSbmt(){
var $input = $('.form-control'),
    $sendpoll = $('#sendpoll');  
$sendpoll.attr('disabled', true);
$input.keyup(function() {
    var trigger = false;
    $input.each(function() {
        if (!$(this).val()) {
            trigger = true;
        }
    });
    trigger ? $sendpoll.attr('disabled', true) : $sendpoll.removeAttr('disabled');
});
}
  
 disableSbmt();
 
 $('form').submit(function(event) {
   
     //=====AJAX jquery POST
      event.preventDefault(); // Stops browser from navigating away from page
      var data = {
        poll:$('#namepoll').val(),
        opt1:$('#opt1').val(),
        opt2:$('#opt2').val(),
        opt3:$('#opt3').val(),
        opt4:$('#opt4').val(),
        opt5:$('#opt5').val(),
        opt6:$('#opt6').val(),
        opt7:$('#opt7').val(),
        opt8:$('#opt8').val(),
        opt9:$('#opt9').val()
                };
        
      $.ajax({
        method: "POST",
        url: "/new/poll",
        data: data
          })
        .done(function( msg ) {
            $('.questions').empty();
            $('.questions').append("<h2>Congratulations!</h2><h3>Your poll has been posted to</h3><a style='font-size:20px' id='linkpoll' href='"+ "/" + msg +"'>https://voterator.herokuapp.com/"+ msg +"<a>")
              });
      
    });
};

$(document).ready(main);