import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import { MAIN_GAME_BUTTON, Step } from '../../types.ts'
import { useGameStore } from '../../store/useGameStore.ts'
import _ from 'lodash'
import { ArrowBack, InfoRounded, Lock, LockOpen, Redo, Settings, Undo } from '@mui/icons-material'
import { IconButton } from '../../components/CustomButtons.tsx'
import { WandStars } from '@nine-thirty-five/material-symbols-react/sharp'

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

export const useMainGameButtons = (
    setStep: (step: Step) => void,
    setSettingsOpen: Dispatch<SetStateAction<boolean>>,
    setAssistantOpen: Dispatch<SetStateAction<boolean>>,
    setTutorialOpen: Dispatch<SetStateAction<boolean>>
) => {
    const [maxButtons, setMaxButtons] = useState(Math.floor(window.innerWidth / ICON_BUTTON_WIDTH) - 1)

    const { setOrToggleLocked, locked } = useGameStore()
    const { undo, redo, pastStates, futureStates } = useGameStore.temporal.getState()

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
                <IconButton variant={'elevated'} onClick={() => setTutorialOpen((tutorialOpen) => !tutorialOpen)}>
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
                <IconButton
                    variant={'elevated'}
                    onClick={() => setAssistantOpen((assistantOpen) => !assistantOpen)}
                    style={{ width: 56, height: 56, padding: 8 }}
                >
                    <WandStars style={{ width: 36, height: 36 }} />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.UNDO,
            el: (
                <IconButton variant={'elevated'} onClick={() => undo()} disabled={!pastStates.length}>
                    <Undo />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.REDO,
            el: (
                <IconButton variant={'elevated'} onClick={() => redo()} disabled={!futureStates.length}>
                    <Redo />
                </IconButton>
            ),
        },
        {
            id: MAIN_GAME_BUTTON.SETTINGS,
            el: (
                <IconButton variant={'elevated'} onClick={() => setSettingsOpen((settingsOpen) => !settingsOpen)}>
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

    return { hiddenButtons, shownButtons }
}
