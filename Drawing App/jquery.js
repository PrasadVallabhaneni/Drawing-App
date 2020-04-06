$(function () {
   
  var paint = false;
  var paint_erase = "paint";
  var canvas = document.getElementById("draw");
  var context = canvas.getContext("2d");
  var container = $("#paint");
  var mouse = { x: 0, y: 0 };
//   context.lineWidth = 10;
  context.lineJoin = "round";
  context.lineCap = "round";
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        },
    });
  if(localStorage.getItem("imagecanvas")!=null){
      var img=new Image();
  img.onload=function(){
      context.drawImage(img,0,0);
  }
  img.src=localStorage.getItem("imagecanvas")
  };
  
  $("#color").change(function(){
      $("#circle").css("background-color", $(this).val());

  })




    $("#eraser").click(function(){
        
        paint_erase="erase";
        $(this).toggleClass("activemode");
        $("#pointer").removeClass("activemode");
    });
    $("#pointer").click(function () {
        container.mousedown(function (e) {
            paint = true;
            context.beginPath();
            var offset = $(this).offset();
            mouse.x = e.pageX - offset.left;
            mouse.y = e.pageY - offset.top;
            context.moveTo(mouse.x, mouse.y);

        });
        container.mousemove(function (e) {
            var offset = $(this).offset();
            mouse.x = e.pageX - offset.left;
            mouse.y = e.pageY - offset.top;
            if (paint == true) {
                if (paint_erase == "paint") {
                    context.strokeStyle = $("#color").val();
                } else {
                    context.strokeStyle = "white";
                }
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            }
        });
        container.mouseup(function () {
            paint = false;
        });
        container.mouseleave(function () {
            paint = false;
        });
     paint_erase = "paint";
        $("#eraser").removeClass("activemode");
        $(this).toggleClass("activemode")
    });
    $("#reset").click(function(){
        $("#eraser").removeClass("activemode");
        $("#pointer").removeClass("activemode");
        context.clearRect(0,0,canvas.width,canvas.height);
        paint_erase=false;
       
    });
    $("#save").click(function(){
       if(typeof(localStorage)!=null){
           localStorage.setItem("imagecanvas", canvas.toDataURL() );
           
       }else{
           window.alert("Your browser doesnt support localstorage")
       }
    });

   

});
