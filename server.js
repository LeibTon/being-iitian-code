//Packages Required
require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const path = require('path');
const showdown = require('showdown');
const multer = require("multer");
const fs= require("fs");
const app=express();
const _ = require("lodash");
const mongoose =  require("mongoose");
/////////////////////////////

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
var converter = new showdown.Converter();
//////////////Database Things /////////////////////////////
var posts=[];
//The mongoose atlas link for connection.
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true,useUnifiedTopology: true});
const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  subtitle: String,
  content: String,
  image: { data: String, enctype: String},
  date: String
});
const Post = mongoose.model("Post",postSchema);
////////////////////////////////////////////////////
//////////////////////MiddleWare////////////////////
///////////////////////////////////////////////////
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });
/////////////////////////////////////////////////////////////
/////////////////Handling Get Routes ////////////////////////
app.get("/",function(req,res){
  Post.find(function(err,posts)
  {
    if(err)
    {console.log(err);}
    else
    {res.render("home",{pageTitle: "Being IITian", posts: posts});}
  });

})
app.get("/home",function(req,res){
  Post.find(function(err,posts)
  {
    if(err)
    {console.log(err);}
    else
    {res.render("home",{pageTitle: "Being IITian", posts: posts});}
  });

})
app.get("/compose",function(req,res){
  res.render("compose",{pageTitle: "Share Your Experiences"});
});
app.get("/posts/:topic",function(req,res){
  Post.find(function(err,posts)
  {
    if(err)
    {console.log(err);}
    else
    {const keyValue=req.params.topic;
    for(var i=0;i<posts.length;i++)
    {
      if(_.lowerCase(posts[i].title)==_.lowerCase(keyValue))
      {
        var next = i+1;
        if(next>posts.length-1)
        next=0;
        var previous=i-1;
        if(previous<0)
        previous=posts.length-1;
        res.render("posts",{post: posts[i],previous: posts[previous].title, contents: posts[i].content, next: posts[next].title});
        break;
      }
    }}
  });
});

app.get("/contact",function(req,res){
  res.render("under-construction",{pageTitle: "Contact Us"});
})

app.get("/questions", function(req,res){
  res.render("under-construction",{pageTitle: "Ask Your Questions..."})
})

app.get("/gallery", function(req,res){
  res.render("under-construction",{pageTitle: "Gallery"})
})
//////////////////////////////////////////////
/////////////Handling Post Routes////////////
////////////////////////////////////////////
app.post("/compose", upload.single("myImage"),function(req,res){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  const post =new Post({
    author: req.body.postAuthor,
    title: req.body.postTitle,
    subtitle: req.body.postSubTitle.toUpperCase(),
    content: converter.makeHtml(req.body.description),
    image: {data: fs.readFileSync(req.file.path, 'base64'), enctype: req.file.mimetype},
    date: today.toLocaleDateString("en-US", options)
  });
  post.save();
  res.sendFile(__dirname+'/views/confirmation.html');
})
//////////////////////////////////////////////////
////////////Listening to Port/////////////////////
////////////////////////////////////////////////
let port = process.env.PORT;
if(port ==null || port == "")
{
port = 3000;
}

app.listen(port,function(){
  console.log("Server has started.")
})

////////////////////////////////////////////////////
