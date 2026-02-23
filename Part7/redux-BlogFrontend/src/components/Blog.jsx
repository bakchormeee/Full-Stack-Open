import { Link } from "react-router-dom";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { TableCell, TableRow, Button } from "@mui/material";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = async () => {
    console.log("attempting to delete blog");
    console.log(JSON.stringify(blog));
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog({ blogID: blog.id });
      console.log("blog successfully deleted");
      dispatch(deleteBlog(blog.id));
    } else {
      console.log("user cancelled deletion");
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>
        <Button variant="contained" onClick={handleDelete}>
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Blog;
