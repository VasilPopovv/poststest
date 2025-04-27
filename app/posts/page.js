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
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/features/PostsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { removePost } from '@/lib/features/PostsSlice'

const Posts = () => {
    const posts = useSelector((state) => state.posts.value);
    const dispatcher = useDispatch();
    const router = useRouter();
    const [inputValue, setInputValue] = useState('')
    
    useEffect(() => {
        dispatcher(getPosts());
    }, [dispatcher]);

   

    return (
        <Paper>
            <Box sx={{ maxWidth: 1200, height: '100dvh', mx: "auto" }}>
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
                        onInput={(e) => setInputValue(e.target.value)}
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
                                                        onClick={() => dispatcher(removePost(i.id))}
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
