import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    value: [],
    isLoading: false,
    error: null
}

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await res.json()
})

const Posts = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        removePost: (state, action) => {
            state.value = state.value.filter(i => i.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.value = action.payload;
            state.isLoading = false
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? 'Error geting posts!'
        })
    }
})

export default Posts.reducer;
export const { removePost } = Posts.actions;