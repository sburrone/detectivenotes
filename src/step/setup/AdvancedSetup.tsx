import { FC, useEffect, useState } from 'react'
import { AdvancedCard, Board } from '../../types.ts'
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import _ from 'lodash'
import { faces } from '../../utils.tsx'

interface IAdvancedSetupProps {
    players: string[]
    board: Board
}

const AdvancedSetup: FC<IAdvancedSetupProps> = (props) => {
    const { players, board } = props

    const theme = useTheme()

    const [choice, setChoice] = useState<AdvancedCard>(AdvancedCard.UNDEFINED)
    const [assignedCards, setAssignedCards] = useState<number[]>(Array(players.length).fill(0))

    const numCards = board.characters.length + board.weapons.length + board.rooms.length
    const numPlayers = players.length
    const numEach = Math.floor(numCards / numPlayers)
    const numLeftover = numCards & numPlayers
    const numToAssign = _.sum(assignedCards)

    useEffect(() => {
        setAssignedCards(Array(players.length).fill(0))
    }, [players.length, board.id])

    return (
        <>
            <Typography color={'primary'} align={'center'} variant={'h5'}>
                TBD Advanced Setup
            </Typography>
            <Typography color={'secondary'} align={'center'}>
                TBD You can skip this, but you will lose access to the advanced player info panel.
            </Typography>

            <Typography color={'primary'} align={'center'} variant={'h6'}>
                TBD There are {numCards} total cards. With {numPlayers} players, everyone will receive {numEach} cards.
                What should we do with the remaining {numLeftover} cards?
            </Typography>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <Card
                    style={{
                        padding: 0,
                        margin: '1em',
                        width: '40em',
                        height: 'fit-content',
                    }}
                >
                    <CardHeader
                        title={<Typography style={{ fontSize: '1.25rem' }}>TBD Public</Typography>}
                        sx={{
                            backgroundColor:
                                choice === AdvancedCard.PUBLIC
                                    ? (theme.palette as any).primaryContainer.main
                                    : (theme.palette as any).secondaryContainer.main,
                        }}
                        onClick={() => setChoice(AdvancedCard.PUBLIC)}
                    />
                    <CardContent style={{ paddingBottom: 16 }}>
                        <Typography>
                            TBD Make them public. Remember to check them in your table as if they were your cards.
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    style={{
                        padding: 0,
                        margin: '1em',
                        width: '40em',
                        height: 'fit-content',
                    }}
                >
                    <CardHeader
                        title={<Typography style={{ fontSize: '1.25rem' }}>TBD Assign</Typography>}
                        sx={{
                            backgroundColor:
                                choice === AdvancedCard.ASSIGN
                                    ? (theme.palette as any).primaryContainer.main
                                    : (theme.palette as any).secondaryContainer.main,
                        }}
                        onClick={() => setChoice(AdvancedCard.ASSIGN)}
                    />
                    <CardContent style={{ paddingBottom: 16 }}>
                        <Typography>TBD Give the cards out. Choose which players get them.</Typography>
                        <Typography fontSize={'large'} paddingTop={'0.5em'}>
                            Cards to assign: {numLeftover - numToAssign}
                        </Typography>
                        {players.map((player, i) => (
                            <Stack direction={'row'} key={player}>
                                <TextField
                                    value={player}
                                    sx={{
                                        margin: '0.25em 0',
                                        width: '100%',
                                    }}
                                    inputProps={{ disabled: true }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position={'start'}>{faces[i]}</InputAdornment>,
                                        endAdornment: (
                                            <InputAdornment position={'end'}>
                                                <IconButton
                                                    sx={
                                                        theme.components!.MuiFab!.variants!.find(
                                                            (variant) => (variant.props as any).color === 'tertiary'
                                                        )!.style
                                                    }
                                                    disabled={assignedCards[i] === 0}
                                                    onClick={() => {
                                                        setChoice(AdvancedCard.ASSIGN)
                                                        const newAssignedCards = _.clone(assignedCards)
                                                        newAssignedCards[i]--
                                                        setAssignedCards(newAssignedCards)
                                                    }}
                                                >
                                                    <Remove sx={{ fontSize: '0.75em' }} />
                                                </IconButton>
                                                <Typography
                                                    sx={{
                                                        width: '2.5em',
                                                        color: theme.palette.secondary.main,
                                                    }}
                                                    align={'center'}
                                                >
                                                    {assignedCards[i]}
                                                </Typography>
                                                <IconButton
                                                    sx={
                                                        theme.components!.MuiFab!.variants!.find(
                                                            (variant) => (variant.props as any).color === 'tertiary'
                                                        )!.style
                                                    }
                                                    color={'tertiary'}
                                                    disabled={numLeftover === numToAssign}
                                                    onClick={() => {
                                                        setChoice(AdvancedCard.ASSIGN)
                                                        const newAssignedCards = _.clone(assignedCards)
                                                        newAssignedCards[i]++
                                                        setAssignedCards(newAssignedCards)
                                                    }}
                                                >
                                                    <Add sx={{ fontSize: '0.75em' }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AdvancedSetup
