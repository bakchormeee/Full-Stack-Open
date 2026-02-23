import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import userService from "./services/users";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import SingleBlogView from "./components/SingleBlogView";
import { setUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { likeBlog } from "./reducers/blogReducer";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Typography,
} from "@mui/material";

const App = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const blogUserInfo = window.localStorage.getItem("blogUserInfo");
    if (blogUserInfo) {
      const user = JSON.parse(blogUserInfo);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      console.log("token set");
    }

    userService.getAll().then((users) => {
      setUsers(users);
    });

    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  const NavBar = () => {
    const padding = {
      padding: 5,
    };

    return (
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {user ? <em>{user.name} logged in</em> : <div></div>}
        </Toolbar>
      </AppBar>
    );
  };

  const AddBlogs = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm />
    </Togglable>
  );

  const UsersView = () => {
    return (
      <div>
        <Typography variant="h3" sx={{ py: 3 }}>
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} />
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Blogs Created
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const SingleUserView = () => {
    const id = useParams().id;
    console.log(id);
    const selectedUser = users.find((user) => user.id === id);

    if (selectedUser) {
      return (
        <div>
          <h1>{selectedUser.name}</h1>
          <h3>added blogs</h3>
          <ul>
            {selectedUser.blogs.map((blog) => (
              <li>{blog.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Invalid User</div>;
    }
  };

  const HomeView = () => {
    if (user) {
      return (
        <div>
          <BlogList />
          <AddBlogs />
        </div>
      );
    } else {
      navigate("/login");
      return (
        <Typography variant="h4">
          This page is only accessible after login
        </Typography>
      );
    }
  };

  return (
    <div>
      <Notification />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<SingleUserView />} />
        <Route path="/blogs/:id" element={<SingleBlogView />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
