var main = function() {

  $('form').submit(function() {
    var email = $('#email').val();
    var password = $('#password').val();
    
    if(email === "") {
      $(".email-error").text("Please enter your email");
      return false;
    }
    
    if(password === "") {
      $(".password-error").text("Please enter a password");
      return false;
     }
  });
};

$(document).ready(main);