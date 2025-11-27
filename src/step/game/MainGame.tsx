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

interface IGameProps {
    setStep: (step: Step) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)

    const { colorMode, toggleColorMode } = useSettingsStore()
    const { setOrToggleLocked, locked } = useGameStore()

    return (
        <div>
            <UpperBar style={{ margin: 'auto', gap: 2 }}>
                <IconButton variant={'elevated'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
                <IconButton variant={'elevated'}>
                    <InfoRounded />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'} onClick={() => toggleColorMode()}>
                    {colorMode === ColorMode.DARK ? <LightMode /> : <DarkMode />}
                </IconButton>
                <IconButton
                    className={'normal-margin'}
                    variant={locked ? 'filled' : 'elevated'}
                    onClick={() => setOrToggleLocked()}
                >
                    {locked ? <Lock /> : <LockOpen />}
                </IconButton>
                <IconButton variant={'elevated'}>
                    <AutoFixHigh />
                </IconButton>
                <IconButton variant={'elevated'}>
                    <Undo />
                </IconButton>
                <IconButton variant={'elevated'}>
                    <Redo />
                </IconButton>
                <IconButton variant={'elevated'} onClick={() => setSettingsOpen(!settingsOpen)}>
                    <Settings />
                </IconButton>
            </UpperBar>
            <MainBoard />

            <SettingsMenu open={settingsOpen} setOpen={setSettingsOpen} />
        </div>
    )
}

export default MainGame
