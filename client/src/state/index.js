const { createSlice } = require("@reduxjs/toolkit");

// The state that will be stored in our global state
const initialState = {
    //Represents Dark/Light mode state
    mode: "light",
    user: null,
    //Represents all Auth info we will store
    token: null,
    post: []
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
        }
    }
})