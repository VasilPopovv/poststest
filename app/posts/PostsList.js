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
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { removePost, deletePost, getPosts } from "@/lib/features/PostsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const PostsList = ({ filter }) => {
    const skeletonSize = new Array(15).fill(0).map((_, index) => index);
    const router = useRouter();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        if (!posts.length) dispatch(getPosts());
    }, [dispatch, posts]);

    const deletePostById = (id) => {
        dispatch(removePost(id));
        dispatch(deletePost(id));
    };

    return (
        <Grid container spacing={2}>
            {posts.length
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
                                              avatar={
                                                  <Avatar
                                                      sx={{
                                                          bgcolor: "lightGray",
                                                      }}
                                                      aria-label="recipe"
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
                                          <CardContent>
                                              <Typography
                                                  sx={{
                                                      display: "-webkit-box",
                                                      WebkitLineClamp: 2,
                                                      WebkitBoxOrient:
                                                          "vertical",
                                                      textOverflow: "ellipsis",
                                                      overflow: "hidden",
                                                  }}
                                              >
                                                  {post.body}
                                              </Typography>
                                          </CardContent>
                                          <IconButton
                                              aria-label="settings"
                                              onClick={() =>
                                                  router.push(
                                                      `/posts/${post.id}`
                                                  )
                                              }
                                          >
                                              <ArrowForwardIcon />
                                          </IconButton>
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
