import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Badge, Dialog, DialogTitle, List, ListItem, Divider, DialogContent
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from "@mui/icons-material/Menu";
import CommentIcon from '@mui/icons-material/Comment';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";

const AppBarComponent = ({ toggle, toggleTheme }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const title = useSelector(state => state.title.title)
  const comments = useSelector(state => state.posts.comments)

  const toggleDialog = () => {
    setOpen(prev => !prev)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggle()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => toggleTheme()}
        >
          {theme.palette.mode == 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {comments.length ? (<IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={toggleDialog}
        >
          <Badge
            badgeContent={comments.length}
            color="error"
          >
            <CommentIcon />
          </Badge>
        </IconButton>) : ''}

      </Toolbar>
      <Dialog onClose={toggleDialog} open={open}>
        <DialogTitle>Коментарі</DialogTitle>
        <Divider />
        <List sx={{ pt: 0 }}>
          {comments.map(i => {
            return (
              <ListItem disablePadding key={i.id}>
                <DialogContent dividers>
                  <Typography variant="h6" component="h6" gutterBottom >
                    {i.name}
                  </Typography>
                  <Typography gutterBottom>
                    {i.body}
                  </Typography>
                </DialogContent>
              </ListItem>
            )
          })}
        </List>
      </Dialog>
    </AppBar>
  )
}

export default AppBarComponent