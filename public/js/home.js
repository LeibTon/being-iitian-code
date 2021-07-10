$(window).on('load', function() {
  $('.preloader-text').fadeOut('slow');
  $("#status, .status2").addClass("animation2")
  $('#preloader').delay(1000).fadeOut('slow');
  $('body').delay(350).css({'overflow':'visible'});
})


var index=0;
var postshere=[];
function assignvalues(posts)
{
  postshere=posts;
}
function func_open(i=index)
    {
       var box=document.querySelector('.preview');
       box.animate([
                    // keyframes
                    {width: "0"},
                    {width: "100%"}
                  ], {
                    // timing options
                    duration: 500,
                    iterations: 1
                  });
      box.style.width="100%";
       preview(i);
       setTimeout(function(){
         $(".preview1deep").fadeIn(500);
         $(".preview2deep").fadeIn(500);
       }, 500)

    }

function func_close()
{
  var box=document.querySelector('.preview')
  box.animate([
               // keyframes
               {width: "100%"},
               {width: "0"}
             ], {
               // timing options
               duration: 500,
               iterations: 1
             });
  box.style.width = '0%';
  $(".preview1deep").fadeOut(10);
  $(".preview2deep").fadeOut(10);
}


function preview(i=index)
{
  index=i;
  console.log(i);
  console.log(index);
  document.querySelector("#preview-image").setAttribute("src","data:"+postshere[index].image.enctype+"; base64,"+postshere[index].image.data);
  document.querySelector("#title").innerHTML=postshere[index].title;
  document.querySelector("#subtitle").innerHTML=postshere[index].subtitle;
  document.querySelector("#author").innerHTML=postshere[index].author;
  document.querySelector("#date").innerHTML=postshere[index].date;
  document.querySelector("#post").innerHTML=postshere[index].content.substring(0,200)+'...<a href="/posts/'+postshere[index].title+'" class="read-more"> Read More </a>';
  document.querySelector("#current").innerHTML=(index+1);
  document.querySelector("#total").innerHTML="/"+postshere.length;

}

function next()
{
  if(index<postshere.length-1)
  index+=1;
  else
  index=0;
  preview();
}
function previous()
{
  if(index>0)
  index-=1;
  else
  index=postshere.length-1
  preview();
}
