const express = require('express');
const route = express.Router();
const passport = require('passport');

const postController = require('./../components/controller/post');

module.exports = () => {

  route.post('/create', passport.authenticate('jwt', { session: false }), postController.createPost);
  route.post('/get-using-pagination', postController.getAllPosts);
  route.post('/get-by-keyword', postController.getPostByKeywords);
  route.get('/get-by-id:id', postController.getPostById);
  route.get('/get-similars:id', postController.getSimilarPosts);
  route.patch('/edit', passport.authenticate('jwt', { session: false }), postController.editPost);
  route.post('/delete', passport.authenticate('jwt', { session: false }), postController.deletePost);
  route.get('/test', postController.test);

  return route;
}