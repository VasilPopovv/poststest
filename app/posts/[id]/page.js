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
  Button
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, findPost, removePost, deletePost } from "@/lib/features/PostsSlice";
import { useRouter } from 'next/navigation';
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const PostPage = ({ params }) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const post = useSelector((state) => state.posts.postId);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPostById(params.id));
    } else dispatch(findPost(params.id))
  }, [dispatch]);

  const delPost = () => {
    dispatch(removePost(params.id))
    dispatch(deletePost(params.id))
    router.back()
  }

  return (
    <Paper>
      <Box sx={{ height: "calc(100dvh - 4rem)", display: 'flex', justifyContent: 'center' }}>
        {!post.id ? (
          <Box sx={{ height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ maxWidth: '1200px', py: 2 }}>
            <Card >
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
                    sx={{ backgroundColor: 'red' }}
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
    </Paper>
  );
};

export default PostPage;
