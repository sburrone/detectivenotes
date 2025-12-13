import { CustomModal } from '../../components/CustomModal.tsx'
import { Checkbox, Stack, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'
import { GameCardIcon } from './GameCardIcon.tsx'
import {
    Info,
    Lock,
    LockOpen,
    Redo,
    Save,
    Swords,
    Undo,
    WandStars,
} from '@nine-thirty-five/material-symbols-react/sharp'
import { useEffect, useState } from 'react'
import { IconButton } from '../../components/CustomButtons.tsx'
import { useGameStore } from '../../store/useGameStore.ts'
import { AdvancedCard } from '../../types.ts'

export interface ITutorialMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const TutorialMenu = ({ open, setOpen }: ITutorialMenuProps) => {
    const [tutorialLocked, setTutorialLocked] = useState(false)

    const { board, advancedCards } = useGameStore()

    const theme = useTheme()
    const { formatMessage } = useIntl()

    useEffect(() => {
        const t2 = setInterval(() => {
            setTutorialLocked((prev) => !prev)
        }, 1000)

        return () => clearInterval(t2)
    }, [])

    return (
        <CustomModal open={open} setOpen={setOpen} title={formatMessage({ id: 'tutorial' })} color={'tertiary'}>
            <Stack direction={'column'} spacing={4} maxHeight={'calc(100vh - 200px)'}>
                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <GameCardIcon>
                        <Swords />
                    </GameCardIcon>
                    <Typography align={'center'}>{formatMessage({ id: 'tutorial.1' })}</Typography>
                </Stack>

                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <Stack
                        direction={'row'}
                        spacing={1}
                        sx={{
                            backgroundColor: tutorialLocked ? (theme.palette as any).errorContainer.main : undefined,
                            padding: 8,
                        }}
                    >
                        <Checkbox sx={{ padding: 0 }} size={'small'} color={'error'} checked={tutorialLocked} />
                        <GameCardIcon>
                            <Swords />
                        </GameCardIcon>
                    </Stack>
                    <Typography align={'center'} whiteSpace={'pre-line'}>
                        {formatMessage({ id: 'tutorial.2' }).replaceAll('. ', '.\n')}
                    </Typography>
                </Stack>

                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <IconButton sx={{ width: 56, height: 56 }} variant={tutorialLocked ? 'filled' : 'elevated'}>
                        {tutorialLocked ? <Lock /> : <LockOpen />}
                    </IconButton>
                    <Typography align={'center'}>{formatMessage({ id: 'tutorial.3' })}</Typography>
                </Stack>

                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                        <Save />
                    </IconButton>
                    <Typography align={'center'}>{formatMessage({ id: 'tutorial.4' })}</Typography>
                </Stack>

                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                        <WandStars />
                    </IconButton>
                    <Typography align={'center'}>{formatMessage({ id: 'tutorial.5' })}</Typography>
                </Stack>

                <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={1}>
                        <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                            <Undo />
                        </IconButton>
                        <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                            <Redo />
                        </IconButton>
                    </Stack>
                    <Typography align={'center'} whiteSpace={'pre-line'}>
                        {formatMessage({ id: 'tutorial.6' }).replaceAll('. ', '.\n')}
                    </Typography>
                </Stack>

                {advancedCards?.type !== AdvancedCard.UNDEFINED && (
                    <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                            <Info />
                        </IconButton>
                        <Typography align={'center'}>{formatMessage({ id: 'tutorial.infoPanel' })}</Typography>
                    </Stack>
                )}

                {board?.id === 5 && (
                    <Stack direction={'column'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <IconButton sx={{ width: 56, height: 56 }} variant={'tonal'}>
                            12
                        </IconButton>
                        <Typography align={'center'} whiteSpace={'pre-line'}>
                            {formatMessage({ id: 'tutorial.hp' }).replaceAll('. ', '.\n')}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </CustomModal>
    )
}
