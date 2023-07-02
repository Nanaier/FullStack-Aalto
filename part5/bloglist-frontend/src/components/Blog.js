import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, user }) => {
  const [blogVisible, setBlogVisible] = useState(false);
  const [blogState, setBlogState] = useState(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdate = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }; // Increment the likes by 1
    try {
      const updBlog = await blogService.update(blog.id, updatedBlog);
      if (setBlogs) setBlogs(await blogService.getAll());
      const populatedBlogState = { ...updBlog, user: blog.user };
      setBlogState(populatedBlogState);
    } catch (error) {
      console.log("Error updating blog:", error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteById(blog.id);
        if (setBlogs) setBlogs(await blogService.getAll());
        setBlogState(null);
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  };

  const showWhenVisible = { display: blogVisible ? "" : "none" };
  return (
    <>
      {blogState ? (
        <div style={blogStyle} className="blog">
          <div>
            <span className="title">{blogState.title}</span>{" "}
            <span className="author">{blogState.author}</span>
            <button onClick={() => setBlogVisible(!blogVisible)}>
              {blogVisible ? "hide" : "view"}
            </button>
          </div>
          <div style={showWhenVisible} className="hiddenInfo">
            <p className="url">{blogState.url} </p>
            <p className="likes">
              {blogState.likes}{" "}
              <button
                onClick={() => {
                  handleUpdate(blogState);
                }}
                className="likesButton"
              >
                like
              </button>
            </p>
            <p>{blogState.user.name}</p>
            {user.username === blogState.user.username ? (
              <button
                onClick={() => {
                  handleDelete(blogState);
                }}
              >
                delete
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  setBlogs: PropTypes.any,
};

export default Blog;
