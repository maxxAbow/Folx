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
