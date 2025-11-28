import { FC, ReactElement, useEffect, useState } from 'react'
import { MAIN_GAME_BUTTON, Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import {
    ArrowBack,
    AutoFixHigh,
    InfoRounded,
    Lock,
    LockOpen,
    MoreVert,
    Redo,
    Settings,
    Undo,
} from '@mui/icons-material'
import '../../App.css'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'
import { SettingsMenu } from '../../settings/SettingsMenu.tsx'
import { useGameStore } from '../../store/useGameStore.ts'
import { Box, Menu } from '@mui/material'
import _ from 'lodash'

interface IGameProps {
    setStep: (step: Step) => void
}

const ICON_BUTTON_WIDTH = 56

const buttonHierarchy: MAIN_GAME_BUTTON[] = [
    MAIN_GAME_BUTTON.UNDO,
    MAIN_GAME_BUTTON.REDO,
    MAIN_GAME_BUTTON.LOCK,
    MAIN_GAME_BUTTON.ASSISTANT,
    MAIN_GAME_BUTTON.BACK,
    MAIN_GAME_BUTTON.INFO,
    MAIN_GAME_BUTTON.SETTINGS,
]

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [maxButtons, setMaxButtons] = useState(Math.floor(window.innerWidth / ICON_BUTTON_WIDTH) - 1)

    const { setOrToggleLocked, locked } = useGameStore()
    const { undo, redo } = useGameStore.temporal.getState()

    useEffect(() => {
        window.onresize = (e) => {
            setMaxButtons(Math.floor((e.target as Window).innerWidth / ICON_BUTTON_WIDTH) - 1)
        }
        return () => {
            window.onresize = null
        }
    }, [])

    const buttons: { id: MAIN_GAME_BUTTON; el: ReactElement }[] = [
        {
            id: MAIN_GAME_BUTTON.BACK,
            el: (
                <IconButton variant={'elevated'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.INFO,
            el: (
                <IconButton variant={'elevated'}>
                    <InfoRounded />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.LOCK,
            el: (
                <IconButton variant={locked ? 'filled' : 'elevated'} onClick={() => setOrToggleLocked()}>
                    {locked ? <Lock /> : <LockOpen />}
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.ASSISTANT,
            el: (
                <IconButton variant={'elevated'}>
                    <AutoFixHigh />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.UNDO,
            el: (
                <IconButton variant={'elevated'} onClick={() => undo()}>
                    <Undo />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.REDO,
            el: (
                <IconButton variant={'elevated'} onClick={() => redo()}>
                    <Redo />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.SETTINGS,
            el: (
                <IconButton variant={'elevated'} onClick={() => setSettingsOpen(!settingsOpen)}>
                    <Settings />
                </IconButton>
            ),
        },
    ]

    const hiddenButtons = buttons.filter((b) => {
        return maxButtons < buttons.length
            ? !_.dropRight(buttonHierarchy, buttons.length - (maxButtons - 1)).includes(b.id)
            : false
    })

    const shownButtons = buttons.filter((b) => !hiddenButtons.find((hb) => hb.id === b.id))

    return (
        <Box sx={{ display: 'flex', maxHeight: '100dvh', flexDirection: 'column' }}>
            <UpperBar
                style={{ margin: 'auto', gap: 4, paddingTop: 4, paddingBottom: 4, width: '100dw', overflow: 'hidden' }}
            >
                {shownButtons.map((b) => b.el)}
                {!!hiddenButtons.length && (
                    <IconButton variant={'elevated'} onClick={(e) => setMoreAnchorEl(e.target as HTMLButtonElement)}>
                        <MoreVert />
                    </IconButton>
                )}
            </UpperBar>

            <Box sx={{ overflow: 'auto', flex: 1 }}>
                <MainBoard />
            </Box>

            <Menu
                sx={{ marginTop: 20 }}
                open={!!moreAnchorEl}
                anchorEl={moreAnchorEl}
                onClose={() => setMoreAnchorEl(null)}
            >
                {hiddenButtons.map((b) => b.el)}
            </Menu>

            <SettingsMenu open={settingsOpen} setOpen={setSettingsOpen} />
        </Box>
    )
}

export default MainGame
