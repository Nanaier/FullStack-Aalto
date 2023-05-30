const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;
  if (!title || !url) {
    response.status(400).json("No title or url in the request");
  } else {
    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    });
    await blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  });
});

blogRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  ).then(() => {
    response.status(204).end();
  });
});

module.exports = blogRouter;
