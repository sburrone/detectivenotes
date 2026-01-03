import { FC, useState } from 'react'
import { AdvancedCard, BoardIcon, GameBoardRow, PlayerNamesPosition } from '../../types.ts'
import { BoardButton } from '../../components/BoardButton.tsx'
import {
    Box,
    ButtonBase,
    Checkbox,
    Collapse,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useGameStore } from '../../store/useGameStore.ts'
import { useSettingsStore } from '../../store/useSettingsStore.ts'
import { useIntl } from 'react-intl'
import { InfoPanel } from './InfoPanel.tsx'
import { BoardButtonModal } from '../../components/BoardButtonModal.tsx'

const COL_EXTRA = 2

export const MainBoard: FC<{
    showVerticalName: boolean
    infoPanelPlayer: string | null
    setInfoPanelPlayer: (infoPanelPlayer: string | null) => void
}> = ({ showVerticalName, infoPanelPlayer, setInfoPanelPlayer }) => {
    const [openSuspects, setOpenSuspects] = useState(true)
    const [openWeapons, setOpenWeapons] = useState(true)
    const [openRooms, setOpenRooms] = useState(true)

    const { gameBoard, locked: globalLocked, board, players, lockItem, advancedCards } = useGameStore()
    const { playerNamesPosition, splitscreenEnabled } = useSettingsStore()
    console.log('AAA board', gameBoard)
    const theme = useTheme()
    const { formatMessage } = useIntl()

    const handleLockedUpdate = (item: string) => {
        lockItem(item)
    }

    const RowRenderer = (row: GameBoardRow, index: number) => (
        <TableRow
            key={index}
            sx={{ backgroundColor: row.locked ? (theme.palette as any).errorContainer.main : undefined }}
        >
            <TableCell sx={{ fontSize: '1rem' }}>
                <Checkbox
                    sx={{ padding: 0 }}
                    size={'small'}
                    color={'error'}
                    disabled={globalLocked}
                    checked={row.locked}
                    onChange={() => handleLockedUpdate(row.item)}
                />
            </TableCell>
            <TableCell sx={{ fontSize: '1rem' }}>{row.item}</TableCell>
            {row.values.map((value, index) => (
                <TableCell key={index} align={'center'}>
                    <BoardButton
                        key={index}
                        disabled={row.locked}
                        icon={row.locked ? BoardIcon.CROSS : value.icon}
                        number={value.badge}
                        item={row.item}
                        player={index}
                    />
                </TableCell>
            ))}
        </TableRow>
    )

    return (
        <Box sx={{ py: '1em' }}>
            {!splitscreenEnabled && <BoardButtonModal />}

            <TableContainer sx={{ overflow: 'visible' }}>
                <Table
                    size={'small'}
                    stickyHeader={true}
                    sx={{ '& .MuiTableCell-body': { padding: 2 }, borderCollapse: 'separate' }}
                >
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': {
                                backgroundColor: (theme.palette as any).secondaryContainer.main,
                                color: (theme.palette as any).secondaryContainer.contrastText,
                                top: 0,
                                zIndex: theme.zIndex.appBar - 1,
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            {players?.map((player, index) => {
                                return (
                                    <TableCell sx={{ padding: 0, height: 1 }} key={index}>
                                        <ButtonBase
                                            sx={{
                                                fontSize: '1rem',
                                                padding: '16px 0',
                                                display: 'flex',
                                                width: '100%',
                                                height: '100%',
                                                alignItems: 'stretch',
                                            }}
                                            onClick={() => setInfoPanelPlayer(player)}
                                            disabled={advancedCards?.type === AdvancedCard.UNDEFINED}
                                        >
                                            {playerNamesPosition === PlayerNamesPosition.vertical ? (
                                                <Stack direction={'column'} justifyContent={'end'}>
                                                    <Collapse in={showVerticalName} timeout={'auto'} unmountOnExit>
                                                        <Typography
                                                            sx={{
                                                                writingMode: 'vertical-lr',
                                                            }}
                                                        >
                                                            {player}
                                                        </Typography>
                                                    </Collapse>
                                                    <Typography>{player.charAt(0)}</Typography>
                                                </Stack>
                                            ) : (
                                                player
                                            )}
                                        </ButtonBase>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*Sospettati*/}
                        <TableRow
                            sx={
                                openSuspects
                                    ? {
                                          '& .MuiTableCell-root': {
                                              backgroundColor: (theme.palette as any).tertiaryContainer.main,
                                              color: (theme.palette as any).tertiaryContainer.contrastText,
                                          },
                                      }
                                    : undefined
                            }
                        >
                            <TableCell colSpan={(players?.length ?? 0) + COL_EXTRA}>
                                <ButtonBase sx={{ width: '100%' }} onClick={() => setOpenSuspects(!openSuspects)}>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                    <Typography>{formatMessage({ id: 'suspects' })}</Typography>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                </ButtonBase>
                            </TableCell>
                        </TableRow>
                        {openSuspects &&
                            gameBoard?.filter((el) => board?.characters?.includes(el.item)).map(RowRenderer)}

                        {/*Armi*/}
                        <TableRow
                            sx={
                                openWeapons
                                    ? {
                                          '& .MuiTableCell-root': {
                                              backgroundColor: (theme.palette as any).tertiaryContainer.main,
                                              color: (theme.palette as any).tertiaryContainer.contrastText,
                                          },
                                      }
                                    : undefined
                            }
                        >
                            <TableCell colSpan={(players?.length ?? 0) + COL_EXTRA}>
                                <ButtonBase sx={{ width: '100%' }} onClick={() => setOpenWeapons(!openWeapons)}>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                    <Typography>{formatMessage({ id: 'weapons' })}</Typography>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                </ButtonBase>
                            </TableCell>
                        </TableRow>
                        {openWeapons && gameBoard?.filter((el) => board?.weapons?.includes(el.item)).map(RowRenderer)}

                        {/*Stanze*/}
                        <TableRow
                            sx={
                                openRooms
                                    ? {
                                          '& .MuiTableCell-root': {
                                              backgroundColor: (theme.palette as any).tertiaryContainer.main,
                                              color: (theme.palette as any).tertiaryContainer.contrastText,
                                          },
                                      }
                                    : undefined
                            }
                        >
                            <TableCell colSpan={(players?.length ?? 0) + COL_EXTRA}>
                                <ButtonBase sx={{ width: '100%' }} onClick={() => setOpenRooms(!openRooms)}>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                    <Typography>{formatMessage({ id: 'rooms' })}</Typography>
                                    {openSuspects ? (
                                        <KeyboardArrowUp
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    ) : (
                                        <KeyboardArrowDown
                                            sx={{
                                                fontSize: '1.5rem',
                                                fill: (theme.palette as any).tertiaryContainer.contrastText,
                                            }}
                                        />
                                    )}
                                </ButtonBase>
                            </TableCell>
                        </TableRow>
                        {openRooms && gameBoard?.filter((el) => board?.rooms?.includes(el.item)).map(RowRenderer)}
                    </TableBody>
                </Table>
            </TableContainer>

            <InfoPanel
                open={!!infoPanelPlayer && !splitscreenEnabled}
                setOpen={(open) => setInfoPanelPlayer(open ? infoPanelPlayer : null)}
                player={infoPanelPlayer}
            />
        </Box>
    )
}
