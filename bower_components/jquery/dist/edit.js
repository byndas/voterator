var main = function() {

  $('form').submit(function() {
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
  });
};

$(document).ready(main);