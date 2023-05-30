const blogRouter = require("express").Router();
//const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
//const User = require("../models/user");
//const config = require("../utils/config");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes = 0 } = request.body;
  if (!request.token || !request.user)
    return response.status(401).json({ error: "token invalid" });
  const user = request.user;
  if (!title || !url) {
    response.status(400).json("No title or url in the request");
  } else {
    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user.id,
    });
    const result = await blog.save();
    if (result) {
      user.notes = user.notes.concat(result.id);
      await user.save();
      response.status(201).json(result);
    } else {
      response.status(404).end();
    }
  }
});

blogRouter.delete("/:id", async (request, response) => {
  if (!request.token || !request.user)
    return response.status(401).json({ error: "token invalid" });
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id).then(() => {
      response.status(204).json("Blog was removed!").end();
    });
  } else {
    response
      .status(400)
      .json({ error: "User is not an author of this blog!" })
      .end();
  }
});

blogRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  );
  response.status(204).end();
});

module.exports = blogRouter;
