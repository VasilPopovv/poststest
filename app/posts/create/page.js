'use client'
import { useDispatch, useSelector } from "react-redux"
import { useLayoutEffect } from "react"
import { changeTitle } from "@/lib/features/TitleSlice"
import {
    Box,
    Step,
    StepLabel,
    Stepper,
    Button, Paper, TextField, InputAdornment, Dialog, DialogTitle, Divider, Typography, FormControl, FormHelperText
} from "@mui/material"
import { useState } from 'react'
import { createPost, addPost, falseWasCreated } from "@/lib/features/PostsSlice"
import SaveIcon from '@mui/icons-material/Save';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Snackbar from '@mui/material/Snackbar';

const steps = ['Заголовок', 'Тіло', 'Попередній перегляд']

const page = () => {
    const dispatch = useDispatch()
    const wasCreated = useSelector(state => state.posts.wasCreated)
    const postsLength = useSelector(state => state.posts.postsLength)
    const [activeStep, setActiveStep] = useState(0)
    const [post, setPost] = useState({ title: '', body: '' })
    const [openDialog, setOpenDialog] = useState(false)
    const [id, setId] = useState(postsLength + 1)
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        dispatch(changeTitle('Створити пост'))
    }, [dispatch])

    const nextStep = () => {
        setError(false)
        if (activeStep == 0 && post.title.trim() == '') return setError(true)
        if (activeStep == 1 && post.body.trim() == '') return setError(true)
        setActiveStep(prev => prev + 1)
        if (activeStep == 1) setOpenDialog(true)
    }

    const backStep = () => {
        setActiveStep(prev => prev - 1)
        setError(false)
    }

    const confirm = () => {
        setOpenDialog(false)
    }

    const redact = () => {
        setOpenDialog(false)
        backStep()
    }

    const save = () => {
        const newPost = {
            userId: 1,
            id,
            ...post
        }
        setId(prev => prev + 1)
        dispatch(createPost(newPost))
        dispatch(addPost(newPost))
        setPost({ title: '', body: '' })
        setActiveStep(0)
        setTimeout(() => {
            dispatch(falseWasCreated())
        }, 3000)
    }


    const inputHandler = (e) => {
        setError(false)
        setPost((prev) => {
            if (activeStep == 0) {
                return {
                    title: e.target.value,
                    body: prev.body
                }
            }
            else {
                return {
                    title: prev.title,
                    body: e.target.value
                }
            }
        })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: '4rem' }}>
            {openDialog && <Dialog
                open={openDialog}
            >
                <Box>
                    <DialogTitle sx={{ p: 2 }}>
                        Попередній перегляд
                    </DialogTitle>
                    <Divider />
                    <Typography variant="h6" sx={{ px: 2, py: 1 }} >
                        {post.title}
                    </Typography>
                    <Typography sx={{ px: 2, pb: 1 }}>
                        {post.body}
                    </Typography>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'row', p: 1, justifyContent: 'flex-end' }}>
                        <Button
                            color="primary"
                            disabled={activeStep === 0}
                            onClick={redact}
                        >
                            РЕДАГУВАТИ
                        </Button>
                        <Button
                            variant="contained"
                            onClick={confirm}
                        >
                            ПІДТВЕРДИТИ
                        </Button>
                    </Box>
                </Box>
            </Dialog>}
            <Paper elevation={8}>
                <Box sx={{ width: '600px', p: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((lable) => {
                            return (
                                <Step key={lable}>
                                    <StepLabel>{lable}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <Box
                        sx={{ '& > :not(style)': { my: 3 } }}
                        noValidate
                        autoComplete="off"
                    >
                        {activeStep < 2 && <FormControl fullWidth>
                            <TextField
                                fullWidth
                                multiline={activeStep === 1}
                                id="outlined-basic"
                                label={steps[activeStep]}
                                variant="outlined"
                                autoComplete="off"
                                autoFocus
                                onInput={inputHandler}
                                value={activeStep == 0 ? post.title : post.body}
                                error={error}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {activeStep == 0 ? <TitleIcon /> : <TextFieldsIcon />}
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            {error && <FormHelperText error>This field can't be empty!</FormHelperText>}
                        </FormControl>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={backStep}
                        >
                            НАЗАД
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<SaveIcon />}
                            onClick={activeStep < 2 ? nextStep : save}
                        >
                            {activeStep === steps.length - 1 ? 'ЗБЕРЕГТИ' : 'ДАЛІ'}
                        </Button>
                    </Box>
                </Box>{wasCreated &&
                    <Snackbar
                        variant="filled"
                        open={wasCreated}
                        message="Пост успішно створено!"
                        autoHideDuration={3000}
                    />
                }
            </Paper >
        </Box >
    )
}

export default page