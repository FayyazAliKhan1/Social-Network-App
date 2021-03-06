import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

// Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// Get Post
// export const getPost = () => async dispatch => {
//   try {
//     const res = await axios.get(`/api/posts/${postId}`);
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data
//     });
//   } catch (error) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: error.response.statusText, status: error.response.status }
//     });
//   }
// };
//Add Like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
//Remove Like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
