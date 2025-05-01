"use client"
import AppBarComponent from "@/components/AppBar";
import DrawerComp from "@/components/DrawerComp";
import { useState } from 'react'
import { ReduxProvider } from '../lib/providers'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '@/lib/theme';
import { Box, Paper } from "@mui/material";

const Wraper = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [theme, setTheme] = useState(darkTheme)

    const toggleDrawer = () => {
        setOpen(prev => !prev)
    }

    const toggleTheme = () => {
        setTheme(prev => prev == lightTheme ? darkTheme : lightTheme)
    }

    return (
        <>
            <ReduxProvider>
                <ThemeProvider theme={theme}>
                    <AppBarComponent toggle={toggleDrawer} toggleTheme={toggleTheme} />
                    <DrawerComp open={open} toggle={toggleDrawer} />
                    <Paper>
                        <Box sx={{ maxWidth: '1200px', minHeight: "calc(100dvh - 4rem)", mx: 'auto' }}>
                            {children}
                        </Box>
                    </Paper>
                </ThemeProvider>
            </ReduxProvider>
        </>
    )
}

export default Wraper