import { FC, useState } from 'react'
import { BoardIcon } from '../types.ts'
import { Badge, Grid } from '@mui/material'
import { getBoardIcon } from '../utils.tsx'
import { Button, IconButton } from './CustomButtons.tsx'
import { Counter } from './Counter.tsx'
import { useSelector } from 'react-redux'
import { selectColorMode } from '../store/settingsSlice.ts'
import { CustomModal } from './CustomModal.tsx'

export interface IBoardButtonProps {
    icon: BoardIcon
    number: number
    disabled: boolean
    onUpdate: (icon: BoardIcon, number: number) => void
}

const buttonBaseProps = {
    variant: 'text' as const,
    size: 'large' as const,
    sx: { textAlign: 'center', color: 'inherit' },
}

const buttonProps = {
    ...buttonBaseProps,
    sx: {
        ...buttonBaseProps.sx,
        flexDirection: 'column',
        '& .MuiSvgIcon-root': { fontSize: '2.5rem !important' },
    },
}

export const BoardButton: FC<IBoardButtonProps> = (props) => {
    const { icon, number, disabled, onUpdate } = props

    const [open, setOpen] = useState(false)

    const colorMode = useSelector(selectColorMode)

    const handleUpdate = (toUpdate: BoardIcon | number) => {
        const newIcon = typeof toUpdate === 'number' ? icon : toUpdate
        const newNumber = typeof toUpdate === 'number' ? toUpdate : number
        onUpdate(newIcon, newNumber)
        typeof toUpdate !== 'number' && setOpen(false)
    }

    return (
        <>
            <IconButton disabled={disabled} onClick={() => setOpen(true)} {...buttonBaseProps}>
                <Badge
                    color={'info'}
                    overlap={'circular'}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={number}
                >
                    {getBoardIcon(icon, colorMode)}
                </Badge>
            </IconButton>

            <CustomModal color={'primary'} open={open} setOpen={setOpen} title={'TBD Editing'}>
                <Grid container spacing={2} marginBottom={12}>
                    <Grid size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.RESET)}
                            startIcon={getBoardIcon(BoardIcon.RESET, colorMode)}
                        >
                            TBD Reset
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.CHECK)}
                            startIcon={getBoardIcon(BoardIcon.CHECK)}
                        >
                            TBD Yes
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.MAYBE)}
                            startIcon={getBoardIcon(BoardIcon.MAYBE)}
                        >
                            TBD Maybe
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.CROSS)}
                            startIcon={getBoardIcon(BoardIcon.CROSS)}
                        >
                            TBD No
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.MAYBE_NOT)}
                            startIcon={getBoardIcon(BoardIcon.MAYBE_NOT)}
                        >
                            TBD Maybe not
                        </Button>
                    </Grid>
                    <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.STAR)}
                            startIcon={getBoardIcon(BoardIcon.STAR)}
                        >
                            TBD Star
                        </Button>
                    </Grid>
                    <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.QUESTION)}
                            startIcon={getBoardIcon(BoardIcon.QUESTION)}
                        >
                            TBD Question
                        </Button>
                    </Grid>
                    <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.EXCLAMATION)}
                            startIcon={getBoardIcon(BoardIcon.EXCLAMATION)}
                        >
                            TBD Warning
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.FLAG)}
                            startIcon={getBoardIcon(BoardIcon.FLAG)}
                        >
                            TBD Marker
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.SKIP)}
                            startIcon={getBoardIcon(BoardIcon.SKIP)}
                        >
                            TBD Skip
                        </Button>
                    </Grid>

                    {/*Numeri*/}
                    <Counter onChange={handleUpdate} value={number} />
                </Grid>
            </CustomModal>
        </>
    )
}
