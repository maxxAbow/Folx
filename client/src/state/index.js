// Created this so that all our state info can be stored in a local state so that all state info will be available until they clear their cache
const { createSlice } = require("@reduxjs/toolkit");

// The state that will be stored in our global state
const initialState = {
    //Represents Dark/Light mode state
    mode: "light"
}

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    //This a fuction that modifies the global state for the mode
    reducers: {
        setMode: (state) => {
            // changes state of 'mode'
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer