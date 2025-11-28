import { FC, useState } from 'react'
import { ColorMode, Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import {
    ArrowBack,
    AutoFixHigh,
    DarkMode,
    InfoRounded,
    LightMode,
    Lock,
    LockOpen,
    Redo,
    Settings,
    Undo,
} from '@mui/icons-material'
import '../../App.css'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'
import { SettingsMenu } from '../../settings/SettingsMenu.tsx'
import { useSettingsStore } from '../../store/useSettingsStore.ts'
import { useGameStore } from '../../store/useGameStore.ts'
import { Box } from '@mui/material'

interface IGameProps {
    setStep: (step: Step) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)

    const { colorMode, toggleColorMode } = useSettingsStore()
    const { setOrToggleLocked, locked } = useGameStore()
    const { undo, redo } = useGameStore.temporal.getState()

    return (
        <Box sx={{ display: 'flex', maxHeight: '100dvh', flexDirection: 'column' }}>
            <UpperBar style={{ margin: 'auto', gap: 4, py: 4 }}>
                <IconButton variant={'elevated'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
                <IconButton variant={'elevated'}>
                    <InfoRounded />
                </IconButton>
                <IconButton variant={'elevated'} onClick={() => toggleColorMode()}>
                    {colorMode === ColorMode.DARK ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton variant={locked ? 'filled' : 'elevated'} onClick={() => setOrToggleLocked()}>
                    {locked ? <Lock /> : <LockOpen />}
                </IconButton>
                <IconButton variant={'elevated'}>
                    <AutoFixHigh />
                </IconButton>
                <IconButton variant={'elevated'} onClick={() => undo()}>
                    <Undo />
                </IconButton>
                <IconButton variant={'elevated'} onClick={() => redo()}>
                    <Redo />
                </IconButton>
                <IconButton variant={'elevated'} onClick={() => setSettingsOpen(!settingsOpen)}>
                    <Settings />
                </IconButton>
            </UpperBar>

            <Box sx={{ overflow: 'auto', flex: 1 }}>
                <MainBoard />
            </Box>

            <SettingsMenu open={settingsOpen} setOpen={setSettingsOpen} />
        </Box>
    )
}

export default MainGame
