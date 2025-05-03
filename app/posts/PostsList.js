import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader,
    Avatar,
    IconButton,
    Paper,
    Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { removePost, deletePost, getPosts } from "@/lib/features/PostsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PostsList = ({ filter }) => {
    const skeletonSize = new Array(15).fill(0).map((_, index) => index);
    const router = useRouter();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        if (posts.length < 20) dispatch(getPosts());
    }, [dispatch]);

    const deletePostById = (id) => {
        dispatch(removePost(id));
        dispatch(deletePost(id));
    };

    return (
        <Grid container spacing={2}>
            {!isLoading
                ? posts
                      .filter((post) => post.title.includes(filter))
                      .map((post) => {
                          return (
                              <Grid
                                  key={post.id}
                                  size={{ md: 4, sm: 6, xs: 12 }}
                              >
                                  <Card>
                                      <Paper elevation={8}>
                                          <CardHeader
                                              sx={{
                                                  width: "100%",
                                              }}
                                              avatar={
                                                  <Avatar
                                                      sx={{
                                                          bgcolor: "lightGray",
                                                      }}
                                                  >
                                                      {post.title[0].toUpperCase()}
                                                  </Avatar>
                                              }
                                              title={post.title}
                                              subheader={"user " + post.userId}
                                              action={
                                                  <IconButton
                                                      aria-label="delete"
                                                      onClick={() =>
                                                          deletePostById(
                                                              post.id
                                                          )
                                                      }
                                                  >
                                                      <DeleteIcon
                                                          sx={{ color: "red" }}
                                                      />
                                                  </IconButton>
                                              }
                                          />
                                          <CardContent sx={{ pb: 0 }}>
                                              <Typography
                                                  sx={{
                                                      display: "-webkit-box",
                                                      WebkitLineClamp: 2,
                                                      WebkitBoxOrient:
                                                          "vertical",
                                                      textOverflow: "ellipsis",
                                                      overflow: "hidden",
                                                      mb: 1,
                                                  }}
                                              >
                                                  {post.body}
                                              </Typography>
                                              <IconButton
                                                  sx={{ mt: 1, mb: 0 }}
                                                  aria-label="settings"
                                                  onClick={() =>
                                                      router.push(
                                                          `/posts/${post.id}`
                                                      )
                                                  }
                                              >
                                                  <ArrowForwardIcon />
                                              </IconButton>
                                          </CardContent>
                                      </Paper>
                                  </Card>
                              </Grid>
                          );
                      })
                : skeletonSize.map((i) => {
                      return (
                          <Grid key={i} size={{ md: 4, sm: 6, xs: 12 }}>
                              <Paper elevation={8}>
                                  <Box sx={{ p: 1 }}>
                                      <Box
                                          sx={{
                                              display: "flex",
                                              gap: "1rem",
                                              alignItems: "center",
                                              my: 1,
                                          }}
                                      >
                                          <Box>
                                              <Skeleton
                                                  variant="circular"
                                                  width={50}
                                                  height={50}
                                              />
                                          </Box>
                                          <Box sx={{ width: "100%" }}>
                                              <Skeleton
                                                  variant="rectangular"
                                                  sx={{
                                                      width: "100%",
                                                      height: "2rem",
                                                  }}
                                              />
                                          </Box>
                                      </Box>
                                      <Box
                                          sx={{ width: "100%", height: "100%" }}
                                      >
                                          <Skeleton
                                              variant="rectangular"
                                              width={"100%"}
                                              height={120}
                                          />
                                      </Box>
                                      <Box>
                                          <Skeleton width={40} height={30} />
                                      </Box>
                                  </Box>
                              </Paper>
                          </Grid>
                      );
                  })}
        </Grid>
    );
};

export default PostsList;
