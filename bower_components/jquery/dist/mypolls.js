var main = function() {
$(document).on("click", '.glyphicon-remove', function() {
    $(this).parent().remove();
    $.ajax({
        method: "POST",
        url: "/delete/" + $(this).attr('id')
          });
  });
  
 $.ajax({
        method: "GET",
        url: "/polls"
          })
        .done(function(obj) {
            obj.forEach(function(poll){
               $('form').append("<p>"+ poll.name +"<i id="+ poll._id +" class='glyphicon glyphicon-remove'></i></p>");
            });
        });  
};

$(document).ready(main); 