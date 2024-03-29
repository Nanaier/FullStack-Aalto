import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    } else {
      setUser(null);
      blogService.setToken(null);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`User ${user.name} logged in!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleAddBlog = async (blogObj) => {
    try {
      const blog = await blogService.create(blogObj);
      setBlogs(await blogService.getAll());
      setMessage(`Blog ${blog.title} by ${blog.author} added!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Incorrect data");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    setMessage("User logged out!");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const blogForm = () => {
    const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
    const showWhenVisible = { display: newBlogVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={handleAddBlog} />
          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!user && (
        <LoginForm
          message={message}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <div>
            <span>{user.name} logged in</span>
            <button type="submit" onClick={(e) => handleLogout(e)}>
              logout
            </button>
          </div>
          {blogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
