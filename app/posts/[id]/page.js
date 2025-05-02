"use client";
import {
    Paper,
    Box,
    Typography,
    CircularProgress,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Button,
} from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPostById,
    findPost,
    removePost,
    deletePost,
    getComments,
} from "@/lib/features/PostsSlice";
import { useRouter } from "next/navigation";
import { changeTitle } from "@/lib/features/TitleSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { clearComments } from "@/lib/features/PostsSlice";

const PostPage = ({ params }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const post = useSelector((state) => state.posts.postId);

    useLayoutEffect(() => {
        dispatch(changeTitle(`Пост #${params.id}`));
    }, []);

    useEffect(() => {
        if (!posts.length) dispatch(getPostById(params.id));
        else dispatch(findPost(params.id));
        dispatch(getComments(params.id));
        return () => dispatch(clearComments());
    }, [dispatch]);

    const delPost = () => {
        dispatch(removePost(params.id));
        dispatch(deletePost(params.id));
        router.back();
    };

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {!post.id ? (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ py: 2, px: 1 }}>
                    <Card>
                        <Paper elevation={8}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: "lightGray" }}
                                        aria-label="recipe"
                                    >
                                        {post.title[0].toUpperCase()}
                                    </Avatar>
                                }
                                title={post.title}
                                subheader={"user " + post.userId}
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
                                    {post.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "red" }}
                                    startIcon={<DeleteIcon />}
                                    onClick={delPost}
                                >
                                    Видалити пост
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBackIcon />}
                                    onClick={() => router.back()}
                                >
                                    До списку
                                </Button>
                            </CardActions>
                        </Paper>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default PostPage;
