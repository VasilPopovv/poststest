import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
};

const TitleSlice = createSlice({
    name: "title",
    initialState: initialState,
    reducers: {
        changeTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export default TitleSlice.reducer;
export const { changeTitle } = TitleSlice.actions;
