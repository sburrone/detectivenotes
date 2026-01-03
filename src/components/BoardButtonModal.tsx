import { FC } from 'react'
import { CustomModal } from './CustomModal'
import { useBoardButtonModalStore } from '../store/useBoardButtonModalStore.ts'
import { useIntl } from 'react-intl'
import { Grid } from '@mui/material'
import { Button } from './CustomButtons.tsx'
import { BoardIcon, SelectionModalOption } from '../types.ts'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import { getBoardIcon } from '../utils.tsx'
import { Counter } from './Counter.tsx'
import { useGameStore } from '../store/useGameStore.ts'

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

export const BoardButtonModal: FC = () => {
    const { open, setOpen, player, item, icon, number = 0 } = useBoardButtonModalStore()
    const { updateItem, players } = useGameStore()
    const { colorMode, selectionModalOptions, autocomplete, splitscreenEnabled } = useSettingsStore()

    const { formatMessage } = useIntl()

    const handleUpdate = (toUpdate: BoardIcon | number) => {
        const newIcon = typeof toUpdate === 'number' ? icon : toUpdate
        const newNumber = typeof toUpdate === 'number' ? toUpdate : number
        console.log('AAA updating', {
            item,
            newIcon,
            icon,
            newNumber,
            number,
            player,
            if:
                item !== undefined &&
                (newIcon !== undefined || newNumber !== undefined) &&
                player !== undefined &&
                icon !== undefined &&
                number !== undefined,
        })
        if (
            item !== undefined &&
            (newIcon !== undefined || newNumber !== undefined) &&
            player !== undefined &&
            icon !== undefined &&
            number !== undefined
        )
            updateItem({ item, badge: newNumber ?? number, value: newIcon ?? icon, playerIndex: player, autocomplete })
        typeof toUpdate !== 'number' && setOpen(false)
    }

    return (
        <CustomModal
            color={'primary'}
            open={open}
            setOpen={setOpen}
            title={formatMessage({ id: 'editingFor' }, { item, player: players?.[player ?? 0] })}
            disabled={splitscreenEnabled}
        >
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
    )
}
