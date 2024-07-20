const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
let posts=[
  {
    id:uuidv4(),
    username :"anush",
    content:"i love coding "
  },
  {
    id:uuidv4(),
    username :"aditya",
    content:"I want to  rome areound"
  },
  {
    id:uuidv4(),
    username :"gufran ",
    content:"MCA is worst , dont do MCA  "
  }
];

app.get("/post", (req, res) => {
  
  res.render("index.ejs",{ posts: posts }); 
});

app.get("/post/new",(req,res)=>{
res.render("new.ejs");
});
app.post("/post",(req,res)=>{
  let id=uuidv4();
let {username,content}=req.body;
posts.push({id,username,content});
res.redirect("/post");
});

app.get("/post/:id",(req,res)=>{
let{id}=req.params;
let post = posts.find(p => p.id === id);
console.log(post);
res.render("show.ejs",{post});
});

app.get("/post/:id/edit",(req,res)=>{
  let{id,username}=req.params;
  let post = posts.find(p => p.id === id);
  console.log(id);
  res.render("edit.ejs",{post});
  });
  
  app.patch("/posts/:id",(req,res)=>{
        let{id,username}=req.params;
        let newcontent=req.body.content;
        let post = posts.find(p => p.id === id);
        post.content=newcontent;
        console.log(newcontent);
        res.redirect("/post");
  });

  app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id!= id);
    res.redirect("/post");
  });