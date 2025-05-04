import { FC, useState } from 'react'
import { BoardIcon } from '../../types.ts'
import { BoardButton } from '../../components/BoardButton.tsx'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, selectGameBoard, updateItem } from '../../store/gameSlice.ts'
import { IconButton } from '../../components/CustomButtons.tsx'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

export const MainBoard: FC = () => {
    const [openSuspects, setOpenSuspects] = useState(true)
    const [openWeapons, setOpenWeapons] = useState(true)
    const [openRooms, setOpenRooms] = useState(true)

    const game = useSelector(selectGame)
    const gameBoard = useSelector(selectGameBoard)

    const dispatch = useDispatch()

    const handleUpdate = (newIcon: BoardIcon, newNumber: number, item: string, index: number) => {
        dispatch(updateItem({ item, badge: newNumber, value: newIcon, playerIndex: index }))
    }

    return (
        <Box sx={{ padding: '1em' }}>
            <Table size={'small'} stickyHeader={true}>
                <TableHead>
                    <TableCell />
                    {game.players?.map((player, index) => {
                        return (
                            <TableCell sx={{ fontSize: '1.25rem', padding: '6x 16px' }} align={'center'} key={index}>
                                {player}
                            </TableCell>
                        )
                    })}
                </TableHead>
                <TableBody>
                    {/*Sospettati*/}
                    <TableRow>
                        <TableCell
                            sx={{ fontSize: '1.25rem' }}
                            align={'center'}
                            colSpan={(game.players?.length ?? 0) + 1}
                        >
                            <IconButton
                                disableRipple={true}
                                aria-label="expand suspects section"
                                size="small"
                                variant={'text'}
                                onClick={() => setOpenSuspects(!openSuspects)}
                            >
                                {openSuspects ? (
                                    <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                ) : (
                                    <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
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
                                    <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                ) : (
                                    <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
                                )}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {openSuspects &&
                        gameBoard
                            ?.filter((el) => game.board?.characters?.includes(el.item))
                            .map((character, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: '1.25rem' }}>{character.item}</TableCell>
                                        {character.values.map((value, index) => (
                                            <TableCell key={index} align={'center'}>
                                                <BoardButton
                                                    key={index}
                                                    disabled={character.locked}
                                                    icon={value.icon}
                                                    number={value.badge}
                                                    onUpdate={(i, n) => handleUpdate(i, n, character.item, index)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}

                    {/*Armi*/}
                    <TableRow>
                        <TableCell
                            sx={{ fontSize: '1.25rem' }}
                            align={'center'}
                            colSpan={(game.players?.length ?? 0) + 1}
                        >
                            <IconButton
                                disableRipple={true}
                                aria-label="expand suspects section"
                                size="small"
                                variant={'text'}
                                onClick={() => setOpenWeapons(!openWeapons)}
                            >
                                {openWeapons ? (
                                    <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                ) : (
                                    <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
                                )}
                            </IconButton>
                            TBD Weapons
                            <IconButton
                                disableRipple={true}
                                aria-label="expand suspects section"
                                size="small"
                                variant={'text'}
                                onClick={() => setOpenWeapons(!openWeapons)}
                            >
                                {openWeapons ? (
                                    <KeyboardArrowUp sx={{ fontSize: '1.5rem' }} />
                                ) : (
                                    <KeyboardArrowDown sx={{ fontSize: '1.5rem' }} />
                                )}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {openWeapons &&
                        gameBoard
                            ?.filter((el) => game.board?.weapons?.includes(el.item))
                            .map((character, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: '1.25rem' }}>{character.item}</TableCell>
                                        {character.values.map((value, index) => (
                                            <TableCell key={index} align={'center'}>
                                                <BoardButton
                                                    key={index}
                                                    disabled={character.locked}
                                                    icon={value.icon}
                                                    number={value.badge}
                                                    onUpdate={(i, n) => handleUpdate(i, n, character.item, index)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}

                    {/*Stanze*/}
                    <TableRow>
                        <TableCell
                            sx={{ fontSize: '1.25rem' }}
                            align={'center'}
                            colSpan={(game.players?.length ?? 0) + 1}
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
                    {openRooms &&
                        gameBoard
                            ?.filter((el) => game.board?.rooms?.includes(el.item))
                            .map((character, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontSize: '1.25rem' }}>{character.item}</TableCell>
                                        {character.values.map((value, index) => (
                                            <TableCell key={index} align={'center'}>
                                                <BoardButton
                                                    key={index}
                                                    disabled={character.locked}
                                                    icon={value.icon}
                                                    number={value.badge}
                                                    onUpdate={(i, n) => handleUpdate(i, n, character.item, index)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}
                </TableBody>
            </Table>
            {Object.values(BoardIcon).map((key) => (
                <BoardButton
                    disabled={false}
                    icon={key}
                    number={Math.round(Math.random() * 5)}
                    onUpdate={console.log}
                />
            ))}
        </Box>
    )
}
