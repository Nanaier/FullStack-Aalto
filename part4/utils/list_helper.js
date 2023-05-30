const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  for (const blog of blogs) {
    sum += blog.likes;
  }
  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const favorite = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogCounts = {};
  blogs.forEach((blog) => {
    if (blog.author in blogCounts) {
      blogCounts[blog.author]++;
    } else {
      blogCounts[blog.author] = 1;
    }
  });

  let topAuthor = "";
  let maxBlogs = 0;
  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      topAuthor = author;
      maxBlogs = blogCounts[author];
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const likesByAuthor = {};
  blogs.forEach((blog) => {
    if (blog.author in likesByAuthor) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }
  });

  let topAuthor = "";
  let maxLikes = 0;
  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      topAuthor = author;
      maxLikes = likesByAuthor[author];
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
