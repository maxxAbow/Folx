// Created this so that all our state info can be stored in a local state so that all the user info will be available until they clear their cache
const { createSlice } = require("@reduxjs/toolkit");

// The state that will be stored in our global state
const initialState = {
    //Represents Dark/Light mode state
    mode: "light",
    // user: null,
    //Represents all Auth info we will store
    // token: null,
    // posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //These are fuction that modify the global state
    reducers: {
        setMode: (state) => {
            // changes state of 'mode'
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        // When logging it, it will reset states to null
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id){
                    return action.payload.post;
                } else {
                    return post;
                }
            })
            state.posts = updatedPosts
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer