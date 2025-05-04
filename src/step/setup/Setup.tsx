import { FC, ReactNode, useEffect, useState } from 'react'
import { AdvancedCard, Board, Step } from '../../types.ts'
import { Box, Step as MUIStep, StepLabel, Stepper, Typography } from '@mui/material'
import UpperBar from '../../components/UpperBar.tsx'
import { ArrowBack, Settings } from '@mui/icons-material'
import ChooseBoard from './ChooseBoard.tsx'
import ChoosePlayers from './ChoosePlayers.tsx'
import AdvancedSetup from './AdvancedSetup.tsx'
import _ from 'lodash'
import { initializeBoard } from '../../utils.tsx'
import { useDispatch } from 'react-redux'
import {
    setAdvancedCardSetup,
    setBoard,
    setGameBoard,
    setOrToggleLocked,
    setPlayers as setPlayersR,
} from '../../store/gameSlice.ts'
import { Button, IconButton } from '../../components/CustomButtons.tsx'

interface ISetupProps {
    setStep: (step: Step) => any
}

const Setup: FC<ISetupProps> = (props) => {
    const { setStep } = props

    const dispatch = useDispatch()

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())

    //Step 1: Board
    const [selectedBoard, setSelectedBoard] = useState<Board>()

    //Step 2: Players
    const [players, setPlayers] = useState<string[]>(Array(3).fill(''))
    const [shelvedNames, setShelvedNames] = useState<string[]>(Array(6).fill(''))

    //Step 3: Advanced
    const [choice, setChoice] = useState<AdvancedCard>(AdvancedCard.UNDEFINED)
    const [assignedCards, setAssignedCards] = useState<number[]>(Array(players.length).fill(0))

    const numCards =
        selectedBoard && selectedBoard.characters.length + selectedBoard.weapons.length + selectedBoard.rooms.length -3
    const numPlayers = players.length
    const numEach = numCards && Math.floor(numCards / numPlayers)
    const numLeftover = numCards && numCards % numPlayers
    const numToAssign = _.sum(assignedCards)

    useEffect(() => {
        setAssignedCards(Array(players.length).fill(0))
        setChoice(numLeftover ? AdvancedCard.UNDEFINED : AdvancedCard.NOT_NEEDED)
    }, [players.length, selectedBoard?.id, numLeftover])

    const steps = ['TBD Select board', 'TBD Who is playing?', 'TBD Advanced Setup']

    const isStepOptional = (step: number) => {
        return step === 2
    }

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const isNextDisabled =
        (activeStep === 1 && (players.includes('') || new Set(players).size !== players.length)) ||
        (activeStep === 2 &&
            (choice === AdvancedCard.UNDEFINED || (choice === AdvancedCard.ASSIGN && numToAssign !== 0)))

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)

        if (activeStep === steps.length - 1 && selectedBoard) {
            dispatch(setAdvancedCardSetup({ type: choice, players: assignedCards }))
            dispatch(setBoard(selectedBoard))
            dispatch(setGameBoard(initializeBoard(selectedBoard!, players)))
            dispatch(setOrToggleLocked(false))
            dispatch(setPlayersR(players))
            setStep(Step.GAME)
        }
    }

    const handleBack = () => {
        // if (activeStep === 2) {
        //     setPlayers()
        // }
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
console.log({players})
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
        setChoice(AdvancedCard.UNDEFINED)
    }

    return (
        <div>
            <UpperBar>
                <IconButton variant={'text'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant={'h6'} sx={{ flexGrow: 1 }}>
                    TBD Setup
                </Typography>
                <IconButton variant={'text'} onClick={() => setStep(Step.MAIN)}>
                    <Settings />
                </IconButton>
            </UpperBar>
            <Box sx={{ padding: '1em' }}>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    sx={{ maxWidth: '50em', margin: 'auto', marginBottom: '2em' }}
                >
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {}
                        const labelProps: {
                            optional?: ReactNode
                        } = {}
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">TBD Optional</Typography>
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
                {activeStep === 0 && <ChooseBoard handleChange={setSelectedBoard} activeBoard={selectedBoard} />}
                {activeStep === 1 && (
                    <ChoosePlayers
                        players={players}
                        setPlayers={setPlayers}
                        board={selectedBoard}
                        shelvedNames={shelvedNames}
                        setShelvedNames={setShelvedNames}
                    />
                )}
                {activeStep === 2 && selectedBoard && (
                    <AdvancedSetup
                        players={players}
                        assignedCards={assignedCards}
                        choice={choice}
                        setAssignedCards={setAssignedCards}
                        numCards={numCards}
                        numEach={numEach}
                        numToAssign={numToAssign}
                        numLeftover={numLeftover}
                        setChoice={setChoice}
                        numPlayers={numPlayers}
                    />
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 16,
                    }}
                >
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
                    {isStepOptional(activeStep) && numLeftover !== 0 && (
                        <Button variant={'text'} color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            TBD Skip
                        </Button>
                    )}
                    <Button variant={'elevated'} onClick={handleNext} disabled={isNextDisabled}>
                        {activeStep === steps.length - 1 ? 'TBD Finish' : 'TBD Next'}
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Setup
