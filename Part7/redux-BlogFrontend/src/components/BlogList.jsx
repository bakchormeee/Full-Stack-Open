import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import { setBlogs, likeBlog, deleteBlog } from "../reducers/blogReducer";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const BlogList = () => {
  const sortBlogsByLikes = (blogs) => {
    return blogs.toSorted((a, b) => parseInt(b.likes) - parseInt(a.likes));
  };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => sortBlogsByLikes(state.blogs));

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(
          setBlogs(blogs.sort((a, b) => parseInt(b.likes) - parseInt(a.likes))),
        ),
      );
  }, []);

  return (
    <div>
      <div>
        <Typography variant="h3" sx={{ py: 3 }}>
          Blogs
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BlogList;
