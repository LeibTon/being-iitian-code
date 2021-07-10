
     $(document).ready(function() {
       let imagesPreview = function(input) {
         if (input.files) {
           let filesAmount = input.files.length;
           for (i = 0; i < filesAmount; i++) {
             let reader = new FileReader();
             reader.onload = function(event) {
               // $($.parseHTML("<img>"))
               var img= document.querySelector(".preview_image");
               img.setAttribute("src",event.target.result);
               img.animate([
                    // keyframes
                    {transform: "scale(0)  rotate(0deg)"},
                    {transform: "scale(1) rotate(360deg)"}
                  ], {
                    // timing options
                    duration: 1000,
                    iterations: 1
                  });
             };
             reader.readAsDataURL(input.files[i]);
           }
         }
       };
       $("#input-files").on("change", function() {
         imagesPreview(this);
       });
     });

     $("#input-files").change(function() {
      var filename = this.files[0].name;
      document.getElementById("upload-input").value = filename;
    });

    $( "#post" ).focus(function() {
   var box= document.querySelector(".box-extra");
   box.classList.toggle("visible1")
   $('html, body').css({
    overflow: 'hidden',
    height: '100%'
});
 document.getElementById("extra-text").focus(); 
 });
    $('#btn').click(function() {
     var box= document.querySelector(".box-extra");
     box.classList.toggle("visible1")
   var oneValue = $('#extra-text').val();
   $('#post').val(oneValue)
$('html, body').css({
    overflow: 'auto',
    height: 'auto'
});

})

function working () {
  var temp=$("#upload-input").attr("value")
  if($.type(temp) === "string")
  {
    $(".sliding-bar").css({
    visibility: 'visible'
  })}
}
