import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const BASE_URL = "https://4d53feb2-b69c-460a-9c1e-fbfe11749a6a-00-1mw8o1m4u90ev.pike.replit.dev";

export const fetchPostByUser = createAsyncThunk(
    "post/fetchByUser",
     async(userId) => {
        const response = await fetch (`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
)

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        }

        const response = await axios.post(`${BASE_URL}/posts`,data);
        return response.data;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {posts: [], loading: true},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        }),
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
        });
    }
})

export default postsSlice.reducer