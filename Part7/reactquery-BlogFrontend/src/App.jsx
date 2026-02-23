import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { NotifContext } from "./reducers/notifReducers";
import notifActions from "./actions/notifActions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const { notif, notifDispatch } = useContext(NotifContext);
  const queryClient = useQueryClient();

  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await blogService.getAll();
      return response.sort((a, b) => parseInt(b.likes) - parseInt(a.likes));
    },
  });

  const addBlogMutation = useMutation({
    mutationFn: async (blog) => {
      await blogService.newBlog(blog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: async (blog) => {
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  })

  /*
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes))),
      );
  }, []);
  */

  useEffect(() => {
    const blogUserInfo = window.localStorage.getItem("blogUserInfo");
    if (blogUserInfo) {
      const user = JSON.parse(blogUserInfo);
      setUser(user);
      blogService.setToken(user.token);
      console.log("token set");
    }
  }, []);

  const newNotif = (message) => {
    notifDispatch(notifActions.setNotif(message));
    setTimeout(() => {
      notifDispatch(notifActions.removeNotif());
    }, 5000);
  };

  const reloadBlogs = () => {
    console.log("blogs reloaded");
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes))),
      );
  };

  const handleLogin = async (event) => {
    event.preventDefault(); //need this as page will autoreload after form submit
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogUserInfo", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setUser(user);
    } catch {
      //need further development for error
      console.log("wrong credentials");
      newNotif("Wrong username or password");
    }
  };

  const handleNewBlog = async ({ title, author, url }) => {
    console.log("attempting to add new blog");
    addBlogMutation.mutate({ title, author, url });
    console.log("new Blog added");
    newNotif(`A new blog ${title} by ${author} added`);
  };

  const updateBlogLikes = async ({ blogID, newLikes }) => {
    console.log("attempting to update blog likes");
    console.log(blogID);
    await blogService.updateBlogLikes({ blogID, newLikes });
    console.log("blog updated with new likes");
    reloadBlogs();
  };

  const deleteBlog = async ({ title, author, blogID }) => {
    console.log("attempting to delete blog");
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      await blogService.deleteBlog({ blogID });
      console.log("blog successfully deleted");
      newNotif("Blog successfully deleted");
      reloadBlogs();
    } else {
      console.log("user cancelled deletion");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </div>
    </form>
  );

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
      <div>
        <br />
        {blogs.isSuccess &&
          blogs.data.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateBlogLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  );

  const addBlogs = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm addBlog={handleNewBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification message={notif} />
      {!user && loginForm()}
      {user && showBlogs()}
      {user && addBlogs()}
    </div>
  );
};

export default App;
