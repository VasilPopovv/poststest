"use client";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useRouter} from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <Paper>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          px: 2,
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
              onClick={() => dispatcher(increment())}
            >
              Додати пост
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
