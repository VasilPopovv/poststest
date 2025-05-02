import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../lib/features/PostsSlice";
import titleReducer from "../lib/features/TitleSlice";

export const store = configureStore({
    reducer: { posts: postReducer, title: titleReducer },
});
