const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithThreeBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has three blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithThreeBlog);
    expect(result).toBe(24);
  });

  test("when list has zero blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe("favorite blog", () => {
  test("returns empty object for an empty list of blogs", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({});
  });

  test("returns the favorite blog when there is a single blog", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("returns the blog with the most likes when multiple blogs exist", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 10,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 8,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("returns one of the top favorite blogs if multiple blogs have the same maximum likes", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 10,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "Another favorite blog",
        author: "John Doe",
        likes: 12,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toMatchObject({
      title: expect.any(String),
      author: expect.any(String),
      likes: 12,
    });
  });
});

describe("The most blogs", () => {
  test("returns empty object for an empty list of blogs", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({});
  });

  test("returns the author with the most blogs", () => {
    const blogs = [
      { author: "Robert C. Martin", title: "Clean Code", likes: 12 },
      { author: "Michael Chan", title: "React patterns", likes: 7 },
      { author: "Robert C. Martin", title: "Clean Architecture", likes: 2 },
      { author: "John Doe", title: "Intro to JavaScript", likes: 23 },
      { author: "Robert C. Martin", title: "Agile Principles", likes: 1 },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("The most likes", () => {
  test("returns empty object for an empty list of blogs", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({});
  });

  test("returns the author with the most likes", () => {
    const blogs = [
      { author: "Robert C. Martin", title: "Clean Code", likes: 10 },
      { author: "Michael Chan", title: "React patterns", likes: 5 },
      { author: "Robert C. Martin", title: "Clean Architecture", likes: 8 },
      { author: "John Doe", title: "Intro to JavaScript", likes: 2 },
      {
        author: "Edsger W. Dijkstra",
        title: "Canonical string reduction",
        likes: 12,
      },
      { author: "Edsger W. Dijkstra", title: "Graph algorithms", likes: 5 },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 18,
    });
  });
});
