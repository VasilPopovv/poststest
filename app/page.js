"use client";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useRouter} from 'next/navigation'
import { useDispatch } from "react-redux";
import { changeTitle } from "@/lib/features/TitleSlice";
import { useLayoutEffect } from "react";
import { useTheme } from "@emotion/react";

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const background = theme.palette.mode == 'light' ? '#e1f2ff' : 'linear-gradient(to right, #262626, #450970)';

  useLayoutEffect(() => {
    dispatch(changeTitle('DOiT MVP'))
  }, [dispatch])

  return (
    <Paper>
      <Box
        sx={{
          height: "calc(100dvh - 4rem)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          py: '6rem',
          
          
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            p: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            background,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Ласкаво просимо до DOiT MVP!
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Ми працюємо над MVP освітньої платформи. Приеднуйся до команди!
          </Typography>
          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FormatListBulletedIcon />}
              onClick={() => router.push('/posts')}
            >
              Переглянути пости
            </Button>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => router.push('/posts/create')}
            >
              Додати пост
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
