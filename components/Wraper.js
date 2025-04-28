"use client"
import AppBarComponent from "@/components/AppBar";
import DrawerComp from "@/components/DrawerComp";
import { useState } from 'react'
import { ReduxProvider } from '../lib/providers'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '@/lib/theme';

// const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

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
                <ThemeProvider theme={ theme }>
                    <AppBarComponent toggle={toggleDrawer} toggleTheme={toggleTheme}/>
                    <DrawerComp open={open} toggle={toggleDrawer} />
                    {children}
                </ThemeProvider>
            </ReduxProvider>
        </>
    )
}

export default Wraper