import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from 'next/navigation';


const iconList = [
    { title: "Головна", icon: <HomeIcon />, route: '/' },
    { title: "Усі пости", icon: <FormatListBulletedIcon />, route: '/posts' },
    { title: 'Створити пост', icon: <AddCircleIcon />, route: '/posts/create' }
];

const DrawerComp = ({ open, toggle }) => {
    const router = useRouter();

    return (
        <Box>
            <Drawer open={open} onClose={() => toggle()}>
                <Box sx={{ width: 250 }} role="presentation" onClick={() => toggle()}>
                    <List>
                        {iconList.map((i) => (
                            <ListItem key={i.title} disablePadding>
                                <ListItemButton onClick={() => { if (i.route) router.push(i.route) }}>
                                    <ListItemIcon>{i.icon}</ListItemIcon>
                                    <ListItemText primary={i.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}

export default DrawerComp