import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const AppBarComponent = ({ toggle, toggleTheme }) => {
  const theme = useTheme()

  return (
    <AppBar position="static" sx={{backgroundColor: '#2196f3'}}>
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
            DOiT MVP
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleTheme()}
          >
            {theme.palette.mode == 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default AppBarComponent