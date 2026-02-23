import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router";

import blogService from "../services/blogs";
import loginService from "../services/login";

import { TextField, Button, Typography } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); //need this as page will autoreload after form submit
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogUserInfo", JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch {
      //need further development for error
      console.log("wrong credentials");
      dispatch(setNotification("Wrong username or password"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <Typography variant="h3" sx={{ py: 3 }}>
          Login to application
        </Typography>
        <div>
          <label>
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="Password"
              variant="outlined"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
