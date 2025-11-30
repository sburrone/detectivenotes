import { Dispatch, FC, SetStateAction } from 'react'
import { AdvancedCard, Board } from '../../types.ts'
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    Grid,
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
import { useIntl } from 'react-intl'
import { House, PersonSearch, Swords } from '@nine-thirty-five/material-symbols-react/sharp'
import TextWithIcon from '../../components/TextWithIcon.tsx'

interface IAdvancedSetupProps {
    players: string[]
    numCards?: number
    numEach?: number
    numLeftover?: number
    choice: AdvancedCard
    setChoice: (choice: AdvancedCard) => void
    numToAssign: number
    assignedCards: number[]
    setAssignedCards: Dispatch<SetStateAction<number[]>>
    publicCards: string[]
    setPublicCards: Dispatch<SetStateAction<string[]>>
    numPlayers: number
    board?: Board
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
        board,
        publicCards,
        setPublicCards,
    } = props

    const theme = useTheme()
    const { formatMessage } = useIntl()

    return (
        <>
            <Typography color={'primary'} align={'center'} variant={'h5'}>
                {formatMessage({ id: 'advancedSetup' })}
            </Typography>
            {choice !== AdvancedCard.NOT_NEEDED ? (
                <>
                    <Typography color={'secondary'} align={'center'}>
                        {formatMessage({ id: 'advancedSetup.skipPrompt' })}
                    </Typography>

                    <Typography color={'primary'} align={'center'} variant={'h6'}>
                        {formatMessage({ id: 'advancedSetup.count' }, { numCards, numPlayers, numEach })}
                    </Typography>
                    <Typography color={'primary'} align={'center'} variant={'h6'}>
                        {formatMessage({ id: 'advancedSetup.count2' }, { numLeftover })}
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
                            sx={{
                                padding: 0,
                                margin: '1em',
                                width: '40em',
                                height: 'fit-content',
                            }}
                        >
                            <CardHeader
                                title={
                                    <Typography sx={{ fontSize: '1.25rem' }}>
                                        {formatMessage({ id: 'advancedSetup.public' })}
                                    </Typography>
                                }
                                sx={{
                                    backgroundColor:
                                        choice === AdvancedCard.PUBLIC
                                            ? (theme.palette as any).primaryContainer?.main
                                            : (theme.palette as any).secondaryContainer?.main,
                                }}
                                onClick={() => setChoice(AdvancedCard.PUBLIC)}
                            />
                            <CardContent sx={{ paddingBottom: 16 }}>
                                <Typography>{formatMessage({ id: 'advancedSetup.public.description' })}</Typography>
                                {choice === AdvancedCard.PUBLIC && board && (
                                    <Stack direction={'column'} spacing={2} marginTop={8}>
                                        <TextWithIcon
                                            icon={<PersonSearch />}
                                            text={formatMessage({ id: 'suspects' })}
                                            textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                                        />
                                        <Grid container>
                                            {board?.characters.map((c) => (
                                                <Grid key={c} size={6}>
                                                    <FormControlLabel
                                                        value={publicCards.includes(c)}
                                                        disabled={
                                                            publicCards.includes(c)
                                                                ? false
                                                                : (numLeftover ?? 0) <= publicCards.length
                                                        }
                                                        onChange={(e) => {
                                                            if ((e.target as HTMLInputElement).checked) {
                                                                setPublicCards((prev) => [...prev, c])
                                                            } else {
                                                                setPublicCards((prev) => prev.filter((el) => el !== c))
                                                            }
                                                        }}
                                                        control={<Checkbox sx={{ padding: 0 }} />}
                                                        label={<Typography>{c}</Typography>}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <TextWithIcon
                                            icon={<Swords />}
                                            text={formatMessage({ id: 'weapons' })}
                                            textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                                        />
                                        <Grid container>
                                            {board?.weapons.map((c) => (
                                                <Grid key={c} size={6}>
                                                    <FormControlLabel
                                                        value={publicCards.includes(c)}
                                                        disabled={
                                                            publicCards.includes(c)
                                                                ? false
                                                                : (numLeftover ?? 0) <= publicCards.length
                                                        }
                                                        onChange={(e) => {
                                                            if ((e.target as HTMLInputElement).checked) {
                                                                setPublicCards((prev) => [...prev, c])
                                                            } else {
                                                                setPublicCards((prev) => prev.filter((el) => el !== c))
                                                            }
                                                        }}
                                                        control={<Checkbox sx={{ padding: 0 }} />}
                                                        label={<Typography>{c}</Typography>}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <TextWithIcon
                                            icon={<House />}
                                            text={formatMessage({ id: 'rooms' })}
                                            textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                                        />
                                        <Grid container>
                                            {board?.rooms.map((c) => (
                                                <Grid key={c} size={6}>
                                                    <FormControlLabel
                                                        value={publicCards.includes(c)}
                                                        disabled={
                                                            publicCards.includes(c)
                                                                ? false
                                                                : (numLeftover ?? 0) <= publicCards.length
                                                        }
                                                        onChange={(e) => {
                                                            if ((e.target as HTMLInputElement).checked) {
                                                                setPublicCards((prev) => [...prev, c])
                                                            } else {
                                                                setPublicCards((prev) => prev.filter((el) => el !== c))
                                                            }
                                                        }}
                                                        control={<Checkbox sx={{ padding: 0 }} />}
                                                        label={<Typography>{c}</Typography>}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>

                        <Card
                            sx={{
                                padding: 0,
                                margin: '1em',
                                width: '40em',
                                height: 'fit-content',
                            }}
                        >
                            <CardHeader
                                title={
                                    <Typography sx={{ fontSize: '1.25rem' }}>
                                        {formatMessage({ id: 'advancedSetup.assign' })}
                                    </Typography>
                                }
                                sx={{
                                    backgroundColor:
                                        choice === AdvancedCard.ASSIGN
                                            ? (theme.palette as any).primaryContainer.main
                                            : (theme.palette as any).secondaryContainer.main,
                                }}
                                onClick={() => setChoice(AdvancedCard.ASSIGN)}
                            />
                            <CardContent sx={{ paddingBottom: 16 }}>
                                <Typography>{formatMessage({ id: 'advancedSetup.assign.description' })}</Typography>
                                {choice === AdvancedCard.ASSIGN && (
                                    <>
                                        <Typography fontSize={'large'} paddingTop={'0.5em'}>
                                            {formatMessage({ id: 'advancedSetup.assign.toAssign' })}:{' '}
                                            {numLeftover ?? 0 - numToAssign}
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
                        {formatMessage({ id: 'advancedSetup.notNeeded' })}
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default AdvancedSetup
