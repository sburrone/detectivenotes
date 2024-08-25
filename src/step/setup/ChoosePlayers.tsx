import { ChangeEvent, FC, useMemo, useState } from 'react'
import {
    InputAdornment,
    Slider,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Board } from '../../types.ts'
import {
    Face2TwoTone,
    Face3TwoTone,
    Face4TwoTone,
    Face5TwoTone,
    Face6TwoTone,
    FaceTwoTone,
} from '@mui/icons-material'

interface IChoosePlayersProps {
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

    const faces = useMemo(
        () => [
            <FaceTwoTone color={'secondary'} />,
            <Face2TwoTone color={'secondary'} />,
            <Face3TwoTone color={'secondary'} />,
            <Face4TwoTone color={'secondary'} />,
            <Face5TwoTone color={'secondary'} />,
            <Face6TwoTone color={'secondary'} />,
        ],
        []
    )

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
                    <Typography
                        sx={{ marginTop: '2em' }}
                        color={'primary'}
                        align={'center'}
                        variant={'h5'}
                    >
                        TBD How many people are playing?
                    </Typography>
                    <Slider
                        value={playerNum}
                        sx={{
                            margin: '1em auto 2em auto',
                            width: '30em',
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
                    sx={{ marginBottom: '1em' }}
                >
                    TBD Write them clockwise starting from your left.
                </Typography>
                {shelvedNames.map((pl, index) => {
                    return (
                        <TextField
                            sx={{
                                margin: '0.25em auto',
                                width: '30em',
                                display: playerNum > index ? undefined : 'none',
                            }}
                            variant={'outlined'}
                            key={index}
                            value={shelvedNames[index]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(index, e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position={'start'}>
                                        {faces[index] ??
                                            faces[index % faces.length]}
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
