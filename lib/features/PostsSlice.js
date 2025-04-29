import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    postId: {},
    comments: [],
    isLoading: false,
    error: null
}

const url = 'https://jsonplaceholder.typicode.com'

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const res = await fetch(url + '/posts');
    return await res.json()
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const res = await fetch(url + `/posts/${id}`, { method: 'DELETE' })
    return await res.json()
})

export const getPostById = createAsyncThunk('posts/getpostbyid', async (id) => {
    const res = await fetch(url + `/posts/${id}`)
    return await res.json()
})

export const getComments = createAsyncThunk('posts/getComments', async (id) => {
    const res = await fetch(url + `/comments?postId=${id}`)
    return await res.json()
})

const Posts = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        removePost: (state, action) => {
            state.posts = state.posts.filter(i => i.id != action.payload)
        },
        findPost: (state, action) => {
            state.postId = state.posts.filter(i => i.id == action.payload)[0]
        },
        clearComments: (state) => {
            state.comments = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.postId = action.payload;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                console.log(`Post ${action.meta.arg} was deleted!`)
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Error geting posts!'
            })
    }
})

export default Posts.reducer;
export const { removePost, findPost, clearComments} = Posts.actions;