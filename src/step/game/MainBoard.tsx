import { FC, useState } from 'react'
import { BoardIcon, GameBoardRow } from '../../types.ts'
import { BoardButton } from '../../components/BoardButton.tsx'
import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material'
import { IconButton } from '../../components/CustomButtons.tsx'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useGameStore } from '../../store/useGameStore.ts'
import { useSettingsStore } from '../../store/useSettingsStore.ts'

const COL_EXTRA = 2

export const MainBoard: FC = () => {
    const [openSuspects, setOpenSuspects] = useState(true)
    const [openWeapons, setOpenWeapons] = useState(true)
    const [openRooms, setOpenRooms] = useState(true)

    const { gameBoard, locked: globalLocked, board, players, updateItem, lockItem } = useGameStore()
    const { autocomplete } = useSettingsStore()

    const theme = useTheme()

    const handleUpdate = (newIcon: BoardIcon, newNumber: number, item: string, index: number) => {
        updateItem({ item, badge: newNumber, value: newIcon, playerIndex: index, autocomplete })
    }

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
                        onUpdate={(i, n) => handleUpdate(i, n, row.item, index)}
                    />
                </TableCell>
            ))}
        </TableRow>
    )

    return (
        <Box sx={{ py: '1em' }}>
            <TableContainer>
                <Table size={'small'} stickyHeader={true} sx={{ '& .MuiTableCell-body': { padding: 2 } }}>
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': {
                                backgroundColor: (theme.palette as any).secondaryContainer.main,
                                color: (theme.palette as any).secondaryContainer.contrastText,
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            {players?.map((player, index) => {
                                return (
                                    <TableCell
                                        sx={{ fontSize: '1rem', padding: '16px 0' }}
                                        align={'center'}
                                        key={index}
                                    >
                                        {player}
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
                            <TableCell
                                sx={{ fontSize: '1rem' }}
                                align={'center'}
                                colSpan={(players?.length ?? 0) + COL_EXTRA}
                            >
                                <IconButton
                                    disableRipple={true}
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenSuspects(!openSuspects)}
                                >
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
                                </IconButton>
                                TBD Suspects
                                <IconButton
                                    disableRipple={true}
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenSuspects(!openSuspects)}
                                >
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
                                </IconButton>
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
                            <TableCell
                                sx={{ fontSize: '1rem' }}
                                align={'center'}
                                colSpan={(players?.length ?? 0) + COL_EXTRA}
                            >
                                <IconButton
                                    disableRipple={true}
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenWeapons(!openWeapons)}
                                >
                                    {openWeapons ? (
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
                                </IconButton>
                                TBD Weapons
                                <IconButton
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenWeapons(!openWeapons)}
                                >
                                    {openWeapons ? (
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
                                </IconButton>
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
                            <TableCell
                                sx={{ fontSize: '1rem' }}
                                align={'center'}
                                colSpan={(players?.length ?? 0) + COL_EXTRA}
                            >
                                <IconButton
                                    disableRipple={true}
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenRooms(!openRooms)}
                                >
                                    {openRooms ? (
                                        <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                    ) : (
                                        <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
                                    )}
                                </IconButton>
                                TBD Rooms
                                <IconButton
                                    disableRipple={true}
                                    aria-label="expand suspects section"
                                    size="small"
                                    variant={'text'}
                                    onClick={() => setOpenRooms(!openRooms)}
                                >
                                    {openRooms ? (
                                        <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                    ) : (
                                        <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
                                    )}
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {openRooms && gameBoard?.filter((el) => board?.rooms?.includes(el.item)).map(RowRenderer)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
