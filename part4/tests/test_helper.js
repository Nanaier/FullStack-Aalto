const User = require("../models/user");
const Blog = require("../models/blog");

const initialBlogs = [
  {
    author: "Michael Chan",
    title: "React patterns",
    url: "http://www.idfsjdfopsjdf.com",
    likes: 5,
  },
  {
    author: "Robert C. Martin",
    title: "Clean Architecture",
    url: "http://www.oocmvpoxjhuodhoo.com",
    likes: 8,
  },
  {
    author: "John Doe",
    title: "Intro to JavaScript",
    url: "http://www.lfjvdjfvipvc.com",
    likes: 2,
  },
  {
    author: "Edsger W. Dijkstra",
    title: "Canonical string reduction",
    url: "http://www.ufhufhsyvdfjhsoud.com",
    likes: 12,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
