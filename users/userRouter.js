const express = require('express');
const users = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post('/users',validateUser, (req, res) => {
  
  users.insert({
    name: req.body.name
  }).then((user) => {
    res.status(201).json(user)
  })
  .catch(error => {
    console.log(error);
    next(error)
  })
});

router.post('/users/:id/posts',validateUserId,validatePost, (req, res) => {
 posts.insert({
   user_id: req.params.id,
   text: req.body.text
 })
 .then(post => {
   res.status(201).json(post)
 })
 .catch(err => {
   console.log(err);
   next(err);
 })

});

router.get('/users', async (req, res) => {
  const data = await users.get();
  res.json(data)
});

router.get('/users/:id', (req, res) => {
  // do your magic!
});

router.get('/users/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/users/:id', (req, res) => {
  // do your magic!
});

router.put('/users/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id)
  .then(user => {
    if(user){
      //set a value to the request so it can be accessed later in the middleware stack
      req.user = user
      next()
    }else{
      res.status(404).json({
        message: "user not found"
      })
    }
  })
  .catch(err => next(err))
}

function validateUser(req, res, next) {
  if(!req.body.name) {
     res.status(400).json({
       message: "missing user's name"
     })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({
      message: "missing post data"
    })
  }else if(!req.body.text){
    res.status(400).json({
      message: "missing required text field"
    })
  }else{
    next()
  }
}

module.exports = {
  router,
  validatePost
}
