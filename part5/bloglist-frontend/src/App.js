import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else{
      setUser(null)
      blogService.setToken(null)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`User ${user.name} logged in!`)
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const handleAddBlog = async(event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({title, author, url: URL})
      setTitle("")
      setAuthor("")
      setURL("")
      const updatedBlogs = await blogService.getAll(); // Fetch the updated list of blogs
      setBlogs(updatedBlogs);
      setMessage(`Blog ${blog.title} by ${blog.author} added!`)
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (exception) {
      setMessage('Incorrect data')
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    setMessage(`User logged out!`)
      setTimeout(() => {setMessage(null)}, 5000)
  }
  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={URL}
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>  
    </div>
  )

  const loginForm = () => (
    <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
  )


  
  return (
    <div>
      {!user && loginForm()} 
      {user && 
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <div>
            <span>{user.name} logged in</span>
            <button type="submit" onClick={(e)=> handleLogout(e)}>logout</button>
          </div>
          {blogForm()}
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App