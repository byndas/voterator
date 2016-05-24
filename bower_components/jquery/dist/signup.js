var main = function() {

  $('form').submit(function() {
    var email = $('#email').val();
    var password = $('#password').val();
   
     if(email === "") {
      $(".email-error").text("Please enter your email address");
      return false;
     }

     if(password === "") {
      $(".password-error").text("Please enter a password");
      return false;
     }
     
    /*if(password.length < 8 && password !== ""){
    $(".password-error").text("Short passwords are easy to guess. Try one with at least 8 characters.");
    return false;
    }*/
    
  });
};

$(document).ready(main);