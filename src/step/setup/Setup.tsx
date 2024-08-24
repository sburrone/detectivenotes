import { FC, ReactNode, useMemo, useState } from 'react'
import { Board, Step } from '../../types.ts'
import {
    Box,
    IconButton,
    StepLabel,
    Stepper,
    Typography,
    Step as MUIStep,
    Button,
} from '@mui/material'
import UpperBar from '../../components/UpperBar.tsx'
import { ArrowBack, Settings } from '@mui/icons-material'
import ChooseBoard from './ChooseBoard.tsx'

interface ISetupProps {
    setStep: (step: Step) => any
}

const Setup: FC<ISetupProps> = (props) => {
    const { setStep } = props

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())

    const [selectedBoard, setSelectedBoard] = useState<Board>()

    const steps = useMemo(
        () => ['TBD Select board', 'TBD Who is playing?', 'TBD Advanced Setup'],
        []
    )

    const isStepOptional = (step: number) => {
        return step === 2
    }

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <UpperBar>
                <IconButton variant={'text'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
                <Typography
                    variant={'h6'}
                    ccomponent={'div'}
                    sx={{ flexGrow: 1 }}
                >
                    TBD Setup
                </Typography>
                <IconButton variant={'text'} onClick={() => setStep(Step.MAIN)}>
                    <Settings />
                </IconButton>
            </UpperBar>
            <Box sx={{ margin: '2em' }}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    sx={{ maxWidth: '50em', margin: 'auto' }}
                >
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {}
                        const labelProps: {
                            optional?: ReactNode
                        } = {}
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">
                                    TBD Optional
                                </Typography>
                            )
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false
                        }
                        return (
                            <MUIStep key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </MUIStep>
                        )
                    })}
                </Stepper>
                {activeStep === 0 && (
                    <ChooseBoard
                        handleChange={setSelectedBoard}
                        activeBoard={selectedBoard}
                    />
                )}
                {activeStep === 1 && <Typography>Step1</Typography>}
                {activeStep === 2 && <Typography>Step2</Typography>}
                <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        variant={'text'}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        TBD Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                        <Button
                            variant={'text'}
                            color="inherit"
                            onClick={handleSkip}
                            sx={{ mr: 1 }}
                        >
                            TBD Skip
                        </Button>
                    )}
                    <Button variant={'elevated'} onClick={handleNext}>
                        {activeStep === steps.length - 1
                            ? 'TBD Finish'
                            : 'TBD Next'}
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Setup
