import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, addComment } from "../reducers/blogReducer";
import { useState } from "react";

const CommentBox = ({ blogID }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleNewComment = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.addComment({
        blogID: blogID,
        comment: comment,
      });
      console.log;
      setComment("");
      dispatch(addComment({ blogID: blogID, comment: comment }));
      console.log("Comment successfully added");
    } catch {
      console.error("Unable to add comment to blog");
    }
  };

  return (
    <div>
      <form onSubmit={handleNewComment}>
        <input
          type="text"
          name="comment"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

const SingleBlogView = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  console.log(id);
  const selectedBlog = blogs.find((blog) => blog.id === id);

  const handleLikeButton = async (event) => {
    event.preventDefault();
    const blogID = selectedBlog.id.toString();
    const newLikes = selectedBlog.likes + 1;
    await blogService.updateBlogLikes({ blogID, newLikes });
    console.log("blog updated with new likes");
    dispatch(likeBlog(blogID));
  };

  if (selectedBlog) {
    return (
      <div>
        <h2>{selectedBlog.title}</h2>
        <div>{selectedBlog.url}</div>
        <div>
          {`${selectedBlog.likes} likes`}
          <button onClick={handleLikeButton}>like</button>
        </div>
        <div>{`added by ${selectedBlog.user.name}`}</div>

        <h3>comments</h3>
        <CommentBox blogID={id} />
        <ul>
          {selectedBlog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>Invalid Blog Chosen</div>;
  }
};

export default SingleBlogView;
