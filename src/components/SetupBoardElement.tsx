import { FC, useState } from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardProps,
    Chip,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import { Board, Item } from '../types.ts'
import { HouseTwoTone, Person, PersonSearchOutlined } from '@mui/icons-material'
import { useIntl } from 'react-intl'
import { Swords } from '@nine-thirty-five/material-symbols-react/sharp'

interface IBoardElementProps {
    board: Board
    selected?: boolean
    onClick: (board: Board) => void
}

const SetupBoardElement: FC<CardProps & IBoardElementProps> = (props) => {
    const { board, selected, onClick, ...rest } = props

    const theme = useTheme()
    const { formatMessage } = useIntl()

    const [expanded, setExpanded] = useState<Item>()

    const handleChipClick = (clicked: Item) => {
        setExpanded(clicked === expanded ? undefined : clicked)
    }

    return (
        <Card
            {...rest}
            sx={{
                padding: 0,
                width: '40em',
                height: 'fit-content',
                ...props.style,
            }}
        >
            <CardHeader
                title={<Typography sx={{ fontSize: '1.25rem' }}>{board.name}</Typography>}
                sx={{
                    backgroundColor: selected
                        ? (theme.palette as any).primaryContainer?.main
                        : (theme.palette as any).secondaryContainer?.main,
                }}
                onClick={() => onClick(board)}
            />
            <CardContent sx={{ paddingBottom: 16 }}>
                <Stack direction={'row'} flexWrap={'wrap'}>
                    <Chip
                        sx={{ margin: '0.25em' }}
                        icon={<Person />}
                        label={`${board.minPlayers}-${board.maxPlayers ?? 6} players`}
                    />
                    <Chip
                        sx={{ margin: '0.25em' }}
                        onClick={() => handleChipClick(Item.SUSPECT)}
                        icon={<PersonSearchOutlined />}
                        label={`${board.characters.length} ${formatMessage({ id: 'players' }).toLowerCase()}`}
                        variant={expanded === Item.SUSPECT ? 'outlined' : undefined}
                    />
                    <Chip
                        sx={{ margin: '0.25em' }}
                        onClick={() => handleChipClick(Item.WEAPON)}
                        icon={<Swords />}
                        label={`${board.weapons.length} ${formatMessage({ id: 'weapons' }).toLowerCase()}`}
                        variant={expanded === Item.WEAPON ? 'outlined' : undefined}
                    />
                    <Chip
                        sx={{ margin: '0.25em' }}
                        onClick={() => handleChipClick(Item.ROOM)}
                        icon={<HouseTwoTone />}
                        label={`${board.rooms.length} ${formatMessage({ id: 'rooms' }).toLowerCase()}`}
                        variant={expanded === Item.ROOM ? 'outlined' : undefined}
                    />
                </Stack>
                {expanded && (
                    <Typography sx={{ margin: '0.5em', marginBottom: 0 }}>
                        {board[expanded].toString().replaceAll(',', ', ')}
                    </Typography>
                )}
                <CardActions sx={{ paddingBottom: 0 }}>
                    <Button size={'small'} variant={'text'} onClick={() => onClick(board)}>
                        {formatMessage({ id: 'useThisBoard' })}
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default SetupBoardElement
