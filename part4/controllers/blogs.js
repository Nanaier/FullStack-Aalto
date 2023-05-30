const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => logger.error(error.message));
});

blogRouter.post("/", (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => logger.error(error.message));
});

module.exports = blogRouter;
