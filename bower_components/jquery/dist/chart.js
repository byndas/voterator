$(document).ready(function(){

  $.ajax({
        method: "GET",
        url:"/values/" + $('#id').text() 
          })
        .done(function(obj) {
          if(obj !== "first"){
             window.values = {
                value1:obj.value1,
                value2:obj.value2,
                value3:obj.value3,
                value4:obj.value4,
                value5:obj.value5,
                value6:obj.value6,
                value7:obj.value7,
                value8:obj.value8,
                value9:obj.value9
              };
           
        var data =[
 {
    value: obj.value1,
    color:"#FE7565",
    highlight:"#789",
    label: $( "#o1" ).text()
  },
  {
    value: obj.value2,
    color:"#FC9D9A",
    highlight:"#789",
    label: $( "#o2" ).text()
  },
  {
    value: obj.value3,
    color:"#F9CDAD",
    highlight:"#789",
    label: $( "#o3" ).text()
  },
  {
    value: obj.value4,
    color:"#C8C8A9",
    highlight:"#789",
    label: $( "#o4" ).text()
  },
  {
    value: obj.value5,
    color:"#83AF9B",
    highlight:"#789",
    label: $( "#o5" ).text()
  },
  {
    value: obj.value6,
    color:"#CC527A",
    highlight:"#789",
    label: $( "#o6" ).text()
  },
  {
    value: obj.value7,
    color:"#98375D",
    highlight:"#789",
    label: $( "#o7" ).text()
  },
  {
    value: obj.value8,
    color:"#474747",
    highlight:"#789",
    label: $( "#o8" ).text()
  },
  {
    value: obj.value9,
    color:"#363636",
    highlight:"#789",
    label: $( "#o9" ).text()
  }
];

var ctx = document.getElementById("canvas").getContext("2d");

var mychart = new Chart(ctx).Pie(data,{
  percentageInnerCutout:50,
  animationEasing:"linear",
  animationSteps:30
});
          } else {
        window.values = {
                value1:0,
                value2:0,
                value3:0,
                value4:0,
                value5:0,
                value6:0,
                value7:0,
                value8:0,
                value9:0
              };
            } 
        });

$('form').submit(function(event) {
   event.preventDefault();
  
  /* if($( "#votefor" ).val() === "1"){}*/
   /*alert(Object.keys(values)[0]);*/
   /*if(Object.keys(values)[0] === "val1"){}*/
   
   for(var i = 0; i < 9; i++){
     if($( "#votefor" ).val() === Object.keys(values)[i]){
       /*alert (Object.keys(values)[i]);
       alert (values[Object.keys(values)[i]]);*/
     values[Object.keys(values)[i]] = values[Object.keys(values)[i]] + 1; 
         }
   }
   
   $.ajax({
      method: "POST",
      url:"/values/" + $('#id').text(),
      data:values,
      success: function(msg){
        console.log(msg);
        alert("You've voted for: " + $( "#votefor option:selected" ).text());
        window.location.reload();
         }
     });
    
});


});