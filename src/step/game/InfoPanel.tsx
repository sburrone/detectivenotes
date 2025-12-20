import { CustomModal } from '../../components/CustomModal.tsx'
import {
    Avatar,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Stack,
    Typography,
} from '@mui/material'
import { useIntl } from 'react-intl'
import { useGameStore } from '../../store/useGameStore.ts'
import { AdvancedCard, BoardIcon } from '../../types.ts'
import { Check, Close, PlayingCards, QuestionMark } from '@nine-thirty-five/material-symbols-react/sharp'
import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { getBoardIcon } from '../../utils.tsx'

export interface IInfoPanelProps {
    open: boolean
    setOpen: (open: boolean) => void
    player: string | null
}

export const InfoPanel = ({ open, setOpen, player }: IInfoPanelProps) => {
    const [showPossible, setShowPossible] = useState(false)

    const { advancedCards, board, players, gameBoard } = useGameStore()

    const { formatMessage } = useIntl()

    const playerIndex = players?.indexOf(player ?? '') ?? 0
    const numCards = board && board.characters.length + board.weapons.length + board.rooms.length - 3
    const numPlayers = players?.length
    const numEach = (numCards && numPlayers && Math.floor(numCards / numPlayers)) ?? 0

    const numForPlayer =
        advancedCards?.players && advancedCards?.type === AdvancedCard.ASSIGN
            ? numEach + advancedCards?.players[playerIndex]
            : numEach

    const numYes = gameBoard?.filter((row) => row.values[playerIndex]?.icon === BoardIcon.CHECK)?.length
    const numMaybe = gameBoard?.filter((row) => row.values[playerIndex]?.icon === BoardIcon.MAYBE)?.length
    const numNo = gameBoard?.filter((row) => row.values[playerIndex]?.icon === BoardIcon.CROSS)?.length

    const possibleItems = gameBoard?.filter(
        (row) =>
            !row.values.find((value) => value.icon === BoardIcon.CHECK) &&
            !row.locked &&
            row.values[playerIndex]?.icon !== BoardIcon.CROSS
    )
    const possibleCharacters = possibleItems?.filter((item) => board?.characters?.includes(item.item))
    const possibleWeapons = possibleItems?.filter((item) => board?.weapons?.includes(item.item))
    const possibleRooms = possibleItems?.filter((item) => board?.rooms?.includes(item.item))

    return (
        <CustomModal
            open={open}
            setOpen={setOpen}
            title={formatMessage({ id: 'infoPanel' }, { player })}
            color={'tertiary'}
        >
            <Stack direction={'column'} spacing={2}>
                <ListItem secondaryAction={<Typography>{numForPlayer}</Typography>}>
                    <ListItemIcon>
                        <PlayingCards />
                    </ListItemIcon>
                    <ListItemText
                        primary={formatMessage({ id: 'infoPanel.total.short' })}
                        secondary={formatMessage({ id: 'infoPanel.total' }, { player })}
                    />
                </ListItem>

                <ListItem secondaryAction={<Typography>{numYes}</Typography>}>
                    <ListItemIcon>
                        <Check style={{ fill: '#36a655' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={formatMessage({ id: 'infoPanel.yes.short' })}
                        secondary={formatMessage({ id: 'infoPanel.yes' }, { player })}
                    />
                </ListItem>

                <ListItem secondaryAction={<Typography>{numMaybe}</Typography>}>
                    <ListItemIcon>
                        <Check style={{ fill: '#77a984' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={formatMessage({ id: 'infoPanel.maybe.short' })}
                        secondary={formatMessage({ id: 'infoPanel.maybe' }, { player })}
                    />
                </ListItem>

                <ListItem secondaryAction={<Typography>{numNo}</Typography>}>
                    <ListItemIcon>
                        <Close style={{ fill: '#d85a4b' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={formatMessage({ id: 'infoPanel.no.short' })}
                        secondary={formatMessage({ id: 'infoPanel.no' }, { player })}
                    />
                </ListItem>

                <ListItem secondaryAction={<Typography>{numForPlayer - (numYes ?? 0)}</Typography>}>
                    <ListItemIcon>
                        <QuestionMark />
                    </ListItemIcon>
                    <ListItemText
                        primary={formatMessage({ id: 'infoPanel.left.short' })}
                        secondary={formatMessage({ id: 'infoPanel.left' }, { player })}
                    />
                </ListItem>

                <ListItemButton dense={true} onClick={() => setShowPossible(!showPossible)}>
                    <ListItemText
                        primary={formatMessage(
                            { id: 'infoPanel.remaining' },
                            { player, numPossible: possibleItems?.length ?? 0 }
                        )}
                    />
                    {showPossible ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse sx={{ marginTop: '0 !important' }} in={showPossible} timeout={'auto'} unmountOnExit>
                    <List
                        component={'div'}
                        disablePadding={true}
                        sx={{ overflow: 'auto', maxHeight: 'calc(100dvh - 500px)' }}
                    >
                        <ListSubheader>{formatMessage({ id: 'suspects' })}</ListSubheader>
                        {possibleCharacters?.map((item) => (
                            <ListItem key={item.item}>
                                <ListItemText primary={item.item} />
                                {item.values[playerIndex]?.icon && getBoardIcon(item.values[playerIndex]?.icon)}
                                {item.values[playerIndex]?.badge && (
                                    <Avatar sx={{ width: 26, height: 26, fontSize: '1rem', marginInlineEnd: 6 }}>
                                        {item.values[playerIndex]?.badge}
                                    </Avatar>
                                )}
                            </ListItem>
                        ))}
                        <ListSubheader>{formatMessage({ id: 'weapons' })}</ListSubheader>
                        {possibleWeapons?.map((item) => (
                            <ListItem key={item.item}>
                                <ListItemText primary={item.item} />
                                {item.values[playerIndex]?.icon && getBoardIcon(item.values[playerIndex]?.icon)}
                                {item.values[playerIndex]?.badge && (
                                    <Avatar sx={{ width: 26, height: 26, fontSize: '1rem', marginInlineEnd: 6 }}>
                                        {item.values[playerIndex]?.badge}
                                    </Avatar>
                                )}
                            </ListItem>
                        ))}
                        <ListSubheader>{formatMessage({ id: 'rooms' })}</ListSubheader>
                        {possibleRooms?.map((item) => (
                            <ListItem key={item.item}>
                                <ListItemText primary={item.item} />
                                {item.values[playerIndex]?.icon && getBoardIcon(item.values[playerIndex]?.icon)}
                                {item.values[playerIndex]?.badge && (
                                    <Avatar sx={{ width: 26, height: 26, fontSize: '1rem', marginInlineEnd: 6 }}>
                                        {item.values[playerIndex]?.badge}
                                    </Avatar>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </Stack>
        </CustomModal>
    )
}
