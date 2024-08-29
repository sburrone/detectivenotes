import { ChangeEvent, FC, useState } from 'react'
import { InputAdornment, Slider, Stack, TextField, Typography } from '@mui/material'
import { Board } from '../../types.ts'
import { faces } from '../../utils.tsx'

interface IChoosePlayersProps {
    players: string[]
    setPlayers: (players: string[]) => void
    board: Board | undefined
    shelvedNames: string[]
    setShelvedNames: (players: string[]) => void
}

const ChoosePlayers: FC<IChoosePlayersProps> = (props) => {
    const { setPlayers, board, shelvedNames, setShelvedNames } = props

    const [playerNum, setPlayerNum] = useState(board?.minPlayers ?? 3)

    const handleSliderChange = (_e: Event, newLength: number) => {
        setPlayerNum(newLength)
        setPlayers(shelvedNames.slice(0, newLength))
    }

    const handleInputChange = (index: number, value: string) => {
        const newArray = shelvedNames
        shelvedNames[index] = value
        setShelvedNames(newArray)
        setPlayers(shelvedNames.slice(0, playerNum))
    }

    const validateField = (value: string, index: number): string | undefined => {
        if (playerNum < index || value === '') {
            return undefined
        }
        if (shelvedNames.slice(0, playerNum).filter((name) => name === value).length > 1) {
            return 'TBD This name is taken'
        }
        return undefined
    }

    return (
        <div>
            {board && (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        margin: 'auto',
                        flexDirection: 'column',
                    }}
                >
                    <Typography color={'primary'} align={'center'} variant={'h5'}>
                        TBD How many people are playing?
                    </Typography>
                    <Slider
                        value={playerNum}
                        sx={{
                            margin: '1em auto 2em auto',
                            width: '30em',
                            maxWidth: 'calc(100vw - 64px)',
                            display: 'block',
                        }}
                        color={'tertiary'}
                        onChange={handleSliderChange}
                        defaultValue={board.minPlayers}
                        step={1}
                        min={board.minPlayers}
                        max={board.maxPlayers ?? 6}
                        valueLabelDisplay={'auto'}
                    />
                </div>
            )}
            <Stack direction={'column'}>
                <Typography color={'primary'} align={'center'} variant={'h5'}>
                    TBD What are their names?
                </Typography>
                <Typography
                    color={'secondary'}
                    variant={'h6'}
                    component={'div'}
                    justifyContent={'center'}
                    margin={'auto'}
                    align={'center'}
                    sx={{ marginBottom: '1em' }}
                >
                    TBD Write them clockwise starting from your left.
                </Typography>
                {shelvedNames.map((_pl, index) => {
                    return (
                        <TextField
                            required={playerNum < index}
                            sx={{
                                margin: '0.25em auto',
                                width: '30em',
                                maxWidth: 'calc(100vw - 64px)',
                                display: playerNum > index ? undefined : 'none',
                            }}
                            error={!!validateField(shelvedNames[index], index)}
                            helperText={validateField(shelvedNames[index], index)}
                            variant={'outlined'}
                            key={index}
                            value={shelvedNames[index]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        {faces[index] ?? faces[index % faces.length]}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )
                })}
            </Stack>
        </div>
    )
}

export default ChoosePlayers
