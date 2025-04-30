'use client'
import { useDispatch } from "react-redux"
import { useLayoutEffect } from "react"
import { changeTitle } from "@/lib/features/TitleSlice"
import { Box, Step, StepLabel, Stepper, Button, Paper, TextField, InputAdornment } from "@mui/material"
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const steps = ['Заголовок', 'Тіло', 'Попередній перегляд']

const page = () => {
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState(0)
    const [ inputValue, setInputValue ] = useState('')
    const [ post, setPost] = useState({title: '', body: ''})

    useLayoutEffect(() => {
        dispatch(changeTitle('Створити пост'))
    }, [dispatch])

    const nextStep = () => {
        setActiveStep(prev => prev + 1)
        setPost(prev => {
            activeStep == 0 ? prev.title = inputValue : prev.body = inputValue
            return prev
        })
        console.log(post)
    }

    const backStep = () => {
        setActiveStep(prev => prev - 1)
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: '4rem' }}>
            <Paper elevation={8}>
                <Box sx={{ width: '600px', p: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((i, index) => {
                            return (
                                <Step key={i}>
                                    <StepLabel>{i}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { my: 3 } }}
                        noValidate
                        autoComplete="off"
                    >
                        {activeStep < 2 && <TextField
                            fullWidth
                            multiline={activeStep === 1}
                            id="outlined-basic"
                            label={steps[activeStep]}
                            variant="outlined"
                            onInput={(e) => setInputValue(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {activeStep == 0 ? <TitleIcon /> : <TextFieldsIcon />}
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />}
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
                            onClick={nextStep}
                        >
                            {activeStep === steps.length - 1 ? 'ЗБЕРЕГТИ' : 'ДАЛІ'}
                        </Button>
                    </Box>
                </Box>
            </Paper >
        </Box >
    )
}

export default page