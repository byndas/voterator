var main = function() {

  $('form').submit(function(event) {
    var current = $('#curpassword').val();
    var password = $('#newpassword').val();
    
    if(current === "") {
      $(".current-error").text("Please enter your current password");
      return false;
    }
    
    if(password === "") {
      $(".password-error").text("Please enter your new password");
      return false;
     }
     
     //=====AJAX jquery POST
      event.preventDefault(); // Stops browser from navigating away from page
      var data = {curpassword: current, newpassword: password};
      $.ajax({
        method: "POST",
        url: "/edit",
        data: data
          })
        .done(function( msg ) {
          $(".current-error").text(msg);
        })
        .fail(function() {
          $(".current-error").text("Incorrect password");
        });
      
    });
};

$(document).ready(main);
