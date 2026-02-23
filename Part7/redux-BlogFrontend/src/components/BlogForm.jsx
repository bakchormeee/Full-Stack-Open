import { useState } from "react";
import { addBlog } from "../reducers/blogReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { Button, TextField, Typography } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      console.log("attempting to add new blog");
      const response = await blogService.newBlog({ title, author, url });
      dispatch(addBlog(response));
      console.log("new Blog added");

      setTitle("");
      setAuthor("");
      setURL("");

      dispatch(setNotification(`A new blog ${title} by ${author} added`));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch {
      console.log("form submission failed");
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ py: 2 }}>
        Create new blog:
      </Typography>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            <TextField
              variant="filled"
              label="Title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              variant="filled"
              label="Author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              variant="filled"
              label="URL"
              type="text"
              value={url}
              onChange={(event) => setURL(event.target.value)}
            />
          </label>
        </div>
        <Button variant="contained" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
