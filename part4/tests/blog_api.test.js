const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
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

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const initialBlog of initialBlogs) {
    const blogObject = new Blog(initialBlog);
    await blogObject.save();
  }
});

test("returned blogs are of correct length", async () => {
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000000);

test("blog has a field id and not _id", async () => {
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
}, 10000000);

test("a valid blog can be added", async () => {
  const newBlog = {
    author: "Anastasiia Lysenko",
    title: "Intro to Typescript",
    url: "http://www.lfjvdjfvipvc.com",
    likes: 15,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("Intro to Typescript");
});
test("likes property defaults to 0 when missing from the request", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "John Doe",
    url: "http://www.sirgfgkdfiycekc.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  expect(response.body.reverse()[0].likes).toBe(0);
});

test("Backend responds with 400 Bad Request if title is missing", async () => {
  await api
    .post("/api/blogs")
    .send({
      // Missing the title property
      url: "https://example.com",
      author: "John Doe",
      likes: 12,
    })
    .expect(400);
});

test("Backend responds with 400 Bad Request if url is missing", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "Test Blog",
      // Missing the url property
      author: "John Doe",
      likes: 12,
    })
    .expect(400);
});
afterAll(async () => {
  await mongoose.connection.close();
});
