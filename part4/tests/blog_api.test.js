const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

beforeAll(async () => {
  await User.deleteMany({});
  await api.post("/api/users/").send({ username: "username", name: "name", password: "password" });
});

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const initialBlog of helper.initialBlogs) {
    const blogObject = new Blog(initialBlog);
    await blogObject.save();
  }
  const response = await api.post("/api/login").send({ username: "username", password: "password" });
  token = response.body.token;
});

test("returned blogs are of correct length", async () => {
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 10000000);

test("blog has a field id and not _id", async () => {
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
}, 10000000);

test("a valid blog can be added", async () => {

  const newBlog = {
    author: "Anastasiia",
    title: "Intro to Typescript",
    url: "http://www.lfjvdjfvipvc.com",
    likes: 15,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ "Authorization": `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
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
    .set({ "Authorization": `Bearer ${token}` })
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
    .set({ "Authorization": `Bearer ${token}` })
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
    .set({ "Authorization": `Bearer ${token}` })
    .expect(400);
});

test("delete blog post", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "John Doe",
    url: "http://www.sirgfgkdfiycekc.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ "Authorization": `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");


  const ids = response.body.map((r) => r.id);
  //const id = ids[Math.floor(Math.random() * ids.length)];
  await api.delete(`/api/blogs/${response.body[ids.length-1].id}`).set({ "Authorization": `Bearer ${token}` }).expect(204);
  const responseNew = await api.get("/api/blogs");

  expect(responseNew.body).toHaveLength(helper.initialBlogs.length);
});

test("update blog post", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((r) => r.id);
  const id = ids[Math.floor(Math.random() * ids.length)];
  await api
    .put(`/api/blogs/${id}`)
    .send({
      likes: 12,
    })
    .expect(200);
  const updatedBlog = await Blog.findById(id);
  expect(updatedBlog.likes).toBe(12);
});

test("a valid blog cannot be added without authorization", async () => {

  const newBlog = {
    author: "TestUser",
    title: "Test Title",
    url: "http://www.test.com",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
});

afterAll(async () => {
  await mongoose.connection.close();
});
