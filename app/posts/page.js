"use client";
import { useDispatch } from "react-redux";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import { useState, useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { changeTitle } from "@/lib/features/TitleSlice";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PostsList from "./PostsList";

let timeoutId = 0;

const Posts = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");

    useLayoutEffect(() => {
        dispatch(changeTitle("Усі пости"));
    }, [dispatch]);

    const inputInterval = (e) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setInputValue(e.target.value);
        }, 500);
    };

    return (
        <Box sx={{ p: 1 }}>
            <IconButton
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 999,
                    backgroundColor: "#2196f3",
                }}
                onClick={() => router.push("/posts/create")}
            >
                <AddIcon sx={{ color: "white" }} />
            </IconButton>
            <Box sx={{ mb: 1 }}>
                <TextField
                    fullWidth
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Пошук за заголовком"
                    onInput={inputInterval}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
            <PostsList filter={inputValue} />
        </Box>
    );
};

export default Posts;
