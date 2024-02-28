const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, x-Requested-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
})

app.post("/api/posts", (req, res, next) => {
  const posts = req.body;
  console.log(post);
  res.status(201).json({
    message: 'post added successfully!'
  })
})

app.use('/api/posts', (req, res, next) =>{
  const posts = [
    { id: 'noah1205',
      title: 'from server-side post',
      content: 'coming from server side',
    },
    {
      id: 'hayven1205',
      title: 'from middleware-side post',
      content: 'coming from middleware side',
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});


// app.use((req, res, next)=>{
//   console.log("from middleware");
//   next()
// })

// app.use((req, res, next)=>{
//   res.send("from express")
// })

module.exports = app;