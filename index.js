const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));

app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"OmSahu",
        content:"Hard Working",
    },
    {
        id:uuidv4(),
        username:"ShradhaKhapra",
        content:"I got selected for my first intership",
    },
];
app.get("/posts",(req,res)=>{//to get data for all post
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{//serve th form
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{// add new post
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{//to get one post
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{//to update specific post
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{//serve the edit form
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{// to delete the specific post
    let {id} = req.params;
    posts = posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening the port :8080");
});