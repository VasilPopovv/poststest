"use client";
import AppBarComponent from "@/components/AppBarComp";
import DrawerComp from "@/components/DrawerComp";
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/lib/theme";
import { Box, Paper } from "@mui/material";
import { store } from "@/lib/store";

const Wraper = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState(darkTheme);

    const toggleDrawer = () => {
        setOpen((prev) => !prev);
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev == lightTheme ? darkTheme : lightTheme));
    };

    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppBarComponent
                        toggle={toggleDrawer}
                        toggleTheme={toggleTheme}
                    />
                    <DrawerComp open={open} toggle={toggleDrawer} />
                    <Paper>
                        <Box
                            sx={{
                                maxWidth: "1200px",
                                minHeight: "calc(100dvh - 4rem)",
                                mx: "auto",
                            }}
                        >
                            {children}
                        </Box>
                    </Paper>
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default Wraper;
