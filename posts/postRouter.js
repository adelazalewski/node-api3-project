const express = require('express');
const posts = require("./postDb");
const {validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const getPosts = await posts.get();
  res.json(getPosts);
});

router.get('/posts/:id',validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/posts/:id',validatePostId, (req, res) => {
  posts.remove(req.params.id).then(post => res.status(204).json(post))
  .catch(err => {
    console.log(err);
    next(err)
  })
});

router.put('/posts/:id',validatePostId,validatePost, (req, res) => {
  posts.update(req.params.id, {
    text: req.body.text
  }).then(post => res.status(200).json(post))
  .catch(err => {
    console.log(err);
    next(err)
  })
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
  .then(post => {
    if(post){
      req.post = post
      next()
    }else{
      res.status(404).json({
        message: "the post with the specified id was not found"
      })
    }
  })
}
module.exports = router;
