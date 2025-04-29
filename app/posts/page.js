"use client";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader,
    Avatar,
    IconButton,
    TextField,
    InputAdornment,
    Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState, useLayoutEffect } from "react";
import { getPosts } from "@/lib/features/PostsSlice";
import { useRouter } from "next/navigation";
import { removePost, deletePost, clearComments } from '@/lib/features/PostsSlice'
import { changeTitle } from '@/lib/features/TitleSlice'

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
        setTimeout(() => {
            setInputValue(e.target.value)
        }, 500)
    }

    const del = (id) => {
        dispatch(removePost(id))
        dispatch(deletePost(id))
    }

    return (
        <Paper>
            <Box sx={{ maxWidth: 1200, minHeight: 'calc(100dvh - 4rem)', height: '100%', mx: "auto" }}>
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
                    <AddIcon sx={{ color: "white" }}/>
                </IconButton>
                <Box
                    component="form"
                    sx={{ "& > :not(style)": { my: 1 }}}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        placeholder="Пошук за заголовком"
                        onChange={deb}
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
                <Grid container spacing={2}>
                    {posts.length ?
                        posts.filter(i => i.title.includes(inputValue)).map((i) => {
                            return (
                                <Grid key={i.id} size={4}>
                                    <Card>
                                        <Paper elevation={8}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        sx={{ bgcolor: "lightGray" }}
                                                        aria-label="recipe"
                                                    >
                                                        {i.title[0].toUpperCase()}
                                                    </Avatar>
                                                }
                                                title={i.title}
                                                subheader={"user " + i.userId}
                                                action={
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => del(i.id)}
                                                    >
                                                        <DeleteIcon sx={{ color: "red" }} />
                                                    </IconButton>
                                                }
                                            />
                                            <CardContent>
                                                <Typography
                                                    sx={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {i.body}
                                                </Typography>
                                            </CardContent>
                                            <IconButton
                                                aria-label="settings"
                                                onClick={() => router.push(`/posts/${i.id}`)}
                                            >
                                                <ArrowForwardIcon />
                                            </IconButton>
                                        </Paper>
                                    </Card>
                                </Grid>
                            );
                        }) : 'Loading...'}
                </Grid>
            </Box>
        </Paper>
    );
};

export default Posts;
