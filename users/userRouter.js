const express = require('express');
const users = require("./userDb");
const posts = require("../posts/postDb");
const {validatePost} = require("../middleware/middleware");
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

router.get('/users/:id',validateUserId, (req, res) => {
  
    res.status(200).json(req.user)
  
});

router.get('/users/:id/posts',validateUserId, (req, res) => {
  users.getUserPosts(req.params.id).then(post => {
    res.json(post)
  })
  .catch(err => {
    console.log(err);
    next(err)
  })
});

router.delete('/users/:id',validateUserId, (req, res) => {
  users.remove(req.params.id).then((user) => {
    res.status(204).json({
      message: "user was deleted"
    })
  })
  .catch(err => {
    console.log(err);
    next(err)
  })
});

router.put('/users/:id',validateUserId, validateUser, (req, res) => {
  users.update(req.params.id, {
    name: req.body.name
  }).then(user => res.status(200).json(user))
  .catch(err => {
    console.log(err);
    next(err)
  })
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
  if(!req.body) {
     res.status(400).json({
      message: "missing user's data"
     })
  }else if(!req.body.name){
    res.status(400).json({
      message: "missing user's name"
    })
  }else{
    next()
  }
}



module.exports = router

