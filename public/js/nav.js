window.addEventListener('scroll', function() {
var y=window.pageYOffset;
let box = document.querySelector(".nav-box");
var elements = document.getElementsByClassName('nav-navbar-item');
if (y>0)
{
   box.style.backgroundColor="white";
   box.style.boxShadow= "0.3em 0.3em 1em rgba(0,0,0,0.3)";
   for (var i = 0; i < elements.length; i++) {
       elements[i].style.color="black";
   }
}
else
{
  box.style.background="transparent";
  box.style.boxShadow= "none";
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.color="white";
  }
}
});

$(document).ready(function(){
  $(".nav-navbar-button").click(function(){
    document.querySelector('nav').style.visibility="collapse";
    $(".nav-header-links").slideDown(800);
    Start();
  });
  $(".nav-image-cross").click(function(){
    $(".nav-header-links").slideUp(800);
    setTimeout(function(){ document.querySelector('nav').style.visibility="visible"; }, 798);
  });
});




//Typewriter effect
var i = 0;
var txt = 'Lorem ipsum dummy text blabla.';
var speed = 90;
var j=0;
var texts = ["You Want to Explore More 💗","You Want to Share Your Experiences Too 🥰","You are Welcome 🙂","Let's Explore These Links 🤗"];
function typeEraser() {
    document.getElementById("typewriter").innerHTML ="";
    Start();
  }

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typewriter").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  else
  {
  setTimeout(typeEraser, 10*speed);
  }
}
function Start(){
i=0;
if(j>=texts.length)
{
j=0;
}
txt=texts[j];
j++;
typeWriter();
}
