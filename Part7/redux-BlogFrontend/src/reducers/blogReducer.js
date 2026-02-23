import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const changedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, likes: parseInt(blog.likes) + 1 } : blog,
    );
    dispatch(setBlogs(changedBlogs));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const changedBlogs = blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(changedBlogs));
  };
};

export const addComment = ({ blogID, comment }) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const selectedBlog = blogs.find((blog) => blog.id === blogID);
    const updatedBlog = {
      ...selectedBlog,
      comments: selectedBlog.comments.concat(comment),
    };
    const updatedBlogs = blogs.map((blog) =>
      blog.id === blogID ? updatedBlog : blog,
    );
    dispatch(setBlogs(updatedBlogs));
  };
};

export default blogSlice.reducer;
export const { setBlogs, addBlog } = blogSlice.actions;
