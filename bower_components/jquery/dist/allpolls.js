$(document).ready(function(){
     $.ajax({
        method: "GET",
        url: "/polls"
          })
        .done(function(obj) {
            obj.forEach(function(poll){
               $('.list').append("<a href='/"+ poll._id +"'><h3>"+ poll.name +"</h3></a>");
            });
        });
})