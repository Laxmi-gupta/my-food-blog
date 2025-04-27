const express = require('express');
const app = express();
const port = 8080;

const path = require("path");
const {v4: uuidv4} = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public
app.use(express.static(path.join(__dirname, "public")));

//post  array 
let posts = [
  {
    id : uuidv4(),
    image: 'https://images.unsplash.com/photo-1662197480393-2a82030b7b83?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heading : "The Art of Perfect Pasta: Secrets from Italy",
    author: "Isabella Romano",
    content:
    `Italy’s love affair with pasta is centuries old — but what makes Italian pasta so heavenly?
    In this blog, we uncover the secrets that Italian nonnas have guarded for generations. Learn about choosing the right type of flour, how kneading affects texture, the magic of letting dough rest, and how thin you should roll it for perfect tagliatelle, ravioli, or lasagna.
    Discover the timeless techniques behind handmade pasta passed down through generations in Italy. From silky tagliatelle to rich, filled ravioli, learn the nuances of flour, eggs, and kneading that bring authentic Italian flavors to life. Whether you're a home cook or a culinary explorer, this guide will inspire you to master pasta like a true Italian nonna.
    `
  },
  {
    id: uuidv4(),
    image: 'https://plus.unsplash.com/premium_photo-1693221705288-7a2531eaa5e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Arjun Patel',
    heading: "The Ultimate Guide to Street Food in Bangkok",
    content: 
    `Bangkok’s vibrant streets come alive through its world-famous street food.
    This guide takes you through the must-try dishes — crispy pad thai cooked over roaring flames, creamy coconut ice cream served in fresh coconuts, spicy som tum (papaya salad) that tickles your tongue, and fluffy mango sticky rice that melts in your mouth.
    We share hidden gems where locals eat, reveal food etiquette tips (like how not to offend vendors!), and list the top night markets such as Chatuchak, Talad Rod Fai, and Yaowarat.
    Step into the bustling streets of Bangkok where food carts sizzle with spicy aromas. Dive into the flavors of pad thai, mango sticky rice, and tom yum soup. This blog takes you through must-visit night markets, hidden stalls, and tips for safely indulging in Thailand's vibrant street cuisine. Your tastebuds are in for an unforgettable ride!`,
  },
  {
    id: uuidv4(),
    image: 'https://images.unsplash.com/photo-1687904119878-b08202a80c2c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    author: 'Emily Hart',
    heading: "Farm-to-Table Feasts: California's Freshest Bites",
    content : 
    `angkok’s vibrant streets come alive through its world-famous street food.
    This guide takes you through the must-try dishes — crispy pad thai cooked over roaring flames, creamy coconut ice cream served in fresh coconuts, spicy som tum (papaya salad) that tickles your tongue, and fluffy mango sticky rice that melts in your mouth.
    We share hidden gems where locals eat, reveal food etiquette tips (like how not to offend vendors!), and list the top night markets such as Chatuchak, Talad Rod Fai, and Yaowarat.
    Explore California’s lush farm-to-table dining experiences where seasonal produce, organic meats, and artisan cheeses take center stage. From the vineyards of Napa Valley to the sun-kissed farms of Santa Barbara, savor dishes crafted with ingredients harvested just hours before they hit your plate. Sustainability never tasted so good.`
  }
];

//Handling new blog  
app.get('/post/create', (req,res) =>{
  res.render("create.ejs");
});

//Handle New Post Submission 
app.post('/post', (req,res) => {
  let  {image, author, heading, content} = req.body;
  let id = uuidv4(); //unique id for the new post
  posts.push({id, image, author, heading, content});
  
  res.redirect('/post');
});

//New Created post displaying on Main Page 
app.get('/post' ,(req,res) => {
  res.render('index.ejs', {posts});
});

// Read More 
app.get('/post/:id' ,(req,res) => {
  let {id} = req.params;
  let post = posts.find((p)=> p.id === id);
  res.render('read.ejs', {post});
});


app.listen(port, () =>{
  console.log(`listening to port: ${port}`)
});








