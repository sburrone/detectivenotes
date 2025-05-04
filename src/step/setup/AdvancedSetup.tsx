import { FC } from 'react'
import { AdvancedCard } from '../../types.ts'
import {
    Card,
    CardContent,
    CardHeader,
    InputAdornment,
    Stack,
    SxProps,
    TextField,
    Theme,
    Typography,
    useTheme,
} from '@mui/material'
import { Add, CelebrationTwoTone, Remove } from '@mui/icons-material'
import _ from 'lodash'
import { faces } from '../../utils.tsx'
import { IconButton } from '../../components/CustomButtons.tsx'

interface IAdvancedSetupProps {
    players: string[]
    numCards?: number
    numEach?: number
    numLeftover?: number
    choice: AdvancedCard
    setChoice: (choice: AdvancedCard) => void
    numToAssign: number
    assignedCards: number[]
    setAssignedCards: (assignedCards: number[]) => void
    numPlayers: number
}

const AdvancedSetup: FC<IAdvancedSetupProps> = (props) => {
    const {
        players,
        numCards,
        numPlayers,
        numEach,
        numLeftover,
        choice,
        setChoice,
        numToAssign,
        assignedCards,
        setAssignedCards,
    } = props

    const theme = useTheme()

    return (
        <>
            <Typography color={'primary'} align={'center'} variant={'h5'}>
                TBD Advanced Setup
            </Typography>
            {choice !== AdvancedCard.NOT_NEEDED ? (
                <>
                    <Typography color={'secondary'} align={'center'}>
                        TBD Feel free to skip this.
                    </Typography>

                    <Typography color={'primary'} align={'center'} variant={'h6'}>
                        TBD There are {numCards} total cards. With {numPlayers} players, everyone will receive {numEach}{' '}
                        cards. What should we do with the remaining {numLeftover} cards?
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
                                    TBD Make them public. Remember to check them in your table as if they were your
                                    cards.
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
                                {choice === AdvancedCard.ASSIGN && (
                                    <>
                                        <Typography fontSize={'large'} paddingTop={'0.5em'}>
                                            Cards to assign: {numLeftover ?? 0 - numToAssign}
                                        </Typography>
                                        {players.map((player, i) => (
                                            <Stack direction={'row'} key={player}>
                                                <TextField
                                                    value={player}
                                                    sx={{
                                                        margin: '0.25em 0',
                                                        width: '100%',
                                                    }}
                                                    slotProps={{
                                                        htmlInput: { disabled: true },
                                                        input: {
                                                            startAdornment: (
                                                                <InputAdornment position={'start'}>
                                                                    {faces[i]}
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position={'end'}>
                                                                    <IconButton
                                                                        sx={
                                                                            theme.components!.MuiFab!.variants!.find(
                                                                                (variant) =>
                                                                                    (variant.props as any).color ===
                                                                                    'tertiary'
                                                                            )!.style as SxProps<Theme>
                                                                        }
                                                                        disabled={assignedCards[i] === 0}
                                                                        onClick={() => {
                                                                            setChoice(AdvancedCard.ASSIGN)
                                                                            const newAssignedCards =
                                                                                _.clone(assignedCards)
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
                                                                                (variant) =>
                                                                                    (variant.props as any).color ===
                                                                                    'tertiary'
                                                                            )!.style as SxProps<Theme>
                                                                        }
                                                                        color={'tertiary'}
                                                                        disabled={numLeftover === numToAssign}
                                                                        onClick={() => {
                                                                            setChoice(AdvancedCard.ASSIGN)
                                                                            const newAssignedCards =
                                                                                _.clone(assignedCards)
                                                                            newAssignedCards[i]++
                                                                            setAssignedCards(newAssignedCards)
                                                                        }}
                                                                    >
                                                                        <Add sx={{ fontSize: '0.75em' }} />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        },
                                                    }}
                                                />
                                            </Stack>
                                        ))}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </>
            ) : (
                <Stack direction={'column'} margin={'2em auto'}>
                    <CelebrationTwoTone color={'info'} sx={{ height: '3em', width: '3em', margin: 'auto' }} />
                    <Typography color={'textPrimary'} padding={'1em'} align={'center'} variant={'h5'}>
                        TBD There are no cards leftover, so Advanced Setup is not needed. You already have access to
                        detailed player info.
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default AdvancedSetup
