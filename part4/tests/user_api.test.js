const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});
test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});
it("should return 400 if password is missing", async () => {
  const newUser = {
    username: "johnsmith",
    name: "John Smith",
  };

  const res = await api.post("/api/users").send(newUser);

  // Check the response
  expect(res.status).toBe(400);
  expect(res.body).toBe("Password is required");
});

it("should return 400 if password is too short", async () => {
  const newUser = {
    username: "johnsmith",
    name: "John Smith",
    password: "12",
  };

  const res = await api.post("/api/users").send(newUser);

  // Check the response
  expect(res.status).toBe(400);
  expect(res.body).toBe("Password should be longer than 3 characters");
});

it("should return 400 if username is not unique", async () => {
  // Create a user with a duplicate username
  const existingUser = {
    username: "johndoe",
    name: "John Doe",
    password: "password123",
  };
  await User.create(existingUser);

  // Attempt to create a user with the same username
  const newUser = {
    username: "johndoe",
    name: "Another John Doe",
    password: "newpassword",
  };

  const res = await api.post("/api/users").send(newUser);

  // Check the response
  expect(res.status).toBe(400);
  expect(res.body).toBe("Username must be unique, it's already taken");
});

afterAll(async () => {
  await mongoose.connection.close();
});
