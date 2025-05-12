import { FC, useState } from 'react'
import { BoardIcon } from '../types.ts'
import { Backdrop, Badge, Card, CardContent, CardHeader, Grid, Modal, Stack, Typography, useTheme } from '@mui/material'
import { getBoardIcon } from '../utils.tsx'
import { Button, IconButton } from './CustomButtons.tsx'
import { Counter } from './Counter.tsx'
import { Close } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectColorMode } from '../store/settingsSlice.ts'

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

    const theme = useTheme()

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

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Card
                    style={{
                        padding: 0,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40em',
                        height: 'fit-content',
                    }}
                >
                    <CardHeader
                        title={
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography style={{ fontSize: '1.25rem', marginInlineStart: 10 }}>
                                    TBD Editing
                                </Typography>
                                <IconButton
                                    variant={'text'}
                                    sx={{ padding: '0 !important', color: 'inherit' }}
                                    onClick={() => setOpen(false)}
                                >
                                    <Close />
                                </IconButton>
                            </Stack>
                        }
                        sx={{
                            backgroundColor: (theme.palette as any).primaryContainer.main,
                        }}
                        onClick={() => setOpen(false)}
                    />
                    <CardContent style={{ paddingBottom: 16 }}>
                        <Grid container spacing={2} marginBottom={12}>
                            <Grid size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.RESET)}
                                    startIcon={getBoardIcon(BoardIcon.RESET)}
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
                    </CardContent>
                </Card>
            </Modal>
        </>
    )
}
