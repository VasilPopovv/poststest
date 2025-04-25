"use client"
import AppBarComponent from "@/components/AppBar";
import DrawerComp from "@/components/DrawerComp";
import { useState } from 'react'

const Wraper = ({ children }) => {

    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            <AppBarComponent toggle={toggleDrawer} />
            <DrawerComp open={open} toggle={toggleDrawer} />
            {children}
        </>
    )
}

export default Wraper