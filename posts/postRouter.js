const express = require('express');
const posts = require("./postDb");
const validatePostMiddleware = require("../users/userRouter");

const router = express.Router();

router.get('/posts', async (req, res) => {
  const getPosts = await posts.get();
  res.json(getPosts);
});

router.get('/posts/:id', (req, res) => {
  // do your magic!
});

router.delete('/posts/:id', (req, res) => {
  // do your magic!
});

router.put('/posts/:id', (req, res) => {
  
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
  .then(post => {
    if(post){
      res.json(post);
      next()
    }else{
      res.status(404).json({
        message: "the post with the specified id was not found"
      })
    }
  })
}
module.exports = router;
