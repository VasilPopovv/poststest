import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../lib/features/PostsSlice'

export const store = configureStore({
    reducer: { posts: postReducer }
});