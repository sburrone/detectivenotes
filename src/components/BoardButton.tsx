import { FC, useState } from 'react'
import { BoardIcon, SelectionModalOption } from '../types.ts'
import { Badge, Grid } from '@mui/material'
import { getBoardIcon } from '../utils.tsx'
import { Button, IconButton } from './CustomButtons.tsx'
import { Counter } from './Counter.tsx'
import { CustomModal } from './CustomModal.tsx'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import { useIntl } from 'react-intl'

export interface IBoardButtonProps {
    icon: BoardIcon
    number: number
    disabled: boolean
    onUpdate: (icon: BoardIcon, number: number) => void
}

const buttonBaseProps = {
    variant: 'text' as const,
    sx: { textAlign: 'center', color: 'inherit', padding: 0 },
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

    const { colorMode, selectionModalOptions } = useSettingsStore()
    const { formatMessage } = useIntl()

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
                    badgeContent={selectionModalOptions === SelectionModalOption.full ? number : 0}
                >
                    {getBoardIcon(icon, colorMode)}
                </Badge>
            </IconButton>

            <CustomModal color={'primary'} open={open} setOpen={setOpen} title={formatMessage({ id: 'editing' })}>
                <Grid container spacing={2} marginBottom={12}>
                    <Grid size={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.RESET)}
                            startIcon={getBoardIcon(BoardIcon.RESET, colorMode)}
                        >
                            {formatMessage({ id: 'reset' })}
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.CHECK)}
                            startIcon={getBoardIcon(BoardIcon.CHECK)}
                        >
                            {formatMessage({ id: 'yes' })}
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.MAYBE)}
                            startIcon={getBoardIcon(BoardIcon.MAYBE)}
                        >
                            {formatMessage({ id: 'maybe' })}
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.CROSS)}
                            startIcon={getBoardIcon(BoardIcon.CROSS)}
                        >
                            {formatMessage({ id: 'no' })}
                        </Button>
                    </Grid>
                    <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button
                            {...buttonProps}
                            onClick={() => handleUpdate(BoardIcon.MAYBE_NOT)}
                            startIcon={getBoardIcon(BoardIcon.MAYBE_NOT)}
                        >
                            {formatMessage({ id: 'maybeNot' })}
                        </Button>
                    </Grid>

                    {selectionModalOptions !== SelectionModalOption.minimal && (
                        <>
                            <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.STAR)}
                                    startIcon={getBoardIcon(BoardIcon.STAR)}
                                >
                                    {formatMessage({ id: 'star' })}
                                </Button>
                            </Grid>
                            <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.QUESTION)}
                                    startIcon={getBoardIcon(BoardIcon.QUESTION)}
                                >
                                    {formatMessage({ id: 'question' })}
                                </Button>
                            </Grid>
                            <Grid size={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.EXCLAMATION)}
                                    startIcon={getBoardIcon(BoardIcon.EXCLAMATION)}
                                >
                                    {formatMessage({ id: 'warning' })}
                                </Button>
                            </Grid>
                            <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.FLAG)}
                                    startIcon={getBoardIcon(BoardIcon.FLAG)}
                                >
                                    {formatMessage({ id: 'marker' })}
                                </Button>
                            </Grid>
                            <Grid size={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Button
                                    {...buttonProps}
                                    onClick={() => handleUpdate(BoardIcon.SKIP)}
                                    startIcon={getBoardIcon(BoardIcon.SKIP)}
                                >
                                    {formatMessage({ id: 'skip' })}
                                </Button>
                            </Grid>
                        </>
                    )}

                    {/*Numeri*/}
                    {selectionModalOptions === SelectionModalOption.full && (
                        <Counter onChange={handleUpdate} value={number} />
                    )}
                </Grid>
            </CustomModal>
        </>
    )
}
