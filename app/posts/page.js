"use client";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    IconButton,
    TextField,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import PostsList from "./PostsList";
import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { getPosts } from "@/lib/features/PostsSlice";
import { useRouter } from "next/navigation";
import { removePost, deletePost } from '@/lib/features/PostsSlice'
import { changeTitle } from '@/lib/features/TitleSlice'

let id = 0;

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const router = useRouter();
    const [inputValue, setInputValue] = useState('')

    useLayoutEffect(() => {
        dispatch(changeTitle('Усі пости'))
    }, [dispatch])

    useEffect(() => {
        if (!posts.length) dispatch(getPosts());
    }, [dispatch]);

    const deb = (e) => {
        clearTimeout(id)
        id = setTimeout(() => {
            setInputValue(e.target.value)
        }, 500)
    }

    const del = (id) => {
        dispatch(removePost(id))
        dispatch(deletePost(id))
    }

    return (
            <Box sx={{ p: 1 }}>
                <IconButton
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 999,
                        backgroundColor: '#2196f3',
                    }}
                    onClick={() => router.push('/posts/create')}
                >
                    <AddIcon sx={{ color: "white" }} />
                </IconButton>
                <Box
                    component="form"
                    sx={{ "& > :not(style)": { my: 1 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        placeholder="Пошук за заголовком"
                        onInput={deb}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <PostsList posts={posts} delPost={del} filter={inputValue}/>
            </Box>
    );
};

export default Posts;
