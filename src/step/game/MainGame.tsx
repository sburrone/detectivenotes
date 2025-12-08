import { FC, Fragment, useState } from 'react'
import { Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import { MoreVert } from '@mui/icons-material'
import '../../App.css'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'
import { SettingsMenu } from '../../settings/SettingsMenu.tsx'
import { Box, Menu } from '@mui/material'
import { useMainGameButtons } from './useMainGameButtons.tsx'
import { AssistantMenu } from './AssistantMenu.tsx'
import { TutorialMenu } from './TutorialMenu.tsx'

interface IGameProps {
    setStep: (step: Step) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [assistantOpen, setAssistantOpen] = useState(false)
    const [tutorialOpen, setTutorialOpen] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLButtonElement | null>(null)

    const { shownButtons, hiddenButtons } = useMainGameButtons(
        setStep,
        setSettingsOpen,
        setAssistantOpen,
        setTutorialOpen
    )

    return (
        <Box sx={{ display: 'flex', maxHeight: '100dvh', flexDirection: 'column' }}>
            <UpperBar
                style={{ margin: 'auto', gap: 4, paddingTop: 4, paddingBottom: 4, width: '100dw', overflow: 'hidden' }}
            >
                {shownButtons.map((b) => (
                    <Fragment key={b.id}>{b.el}</Fragment>
                ))}
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
                slotProps={{ list: { sx: { paddingInline: 12 } } }}
                open={!!moreAnchorEl}
                anchorEl={moreAnchorEl}
                onClose={() => setMoreAnchorEl(null)}
            >
                {hiddenButtons.map((b) => (
                    <Fragment key={b.id}>{b.el}</Fragment>
                ))}
            </Menu>

            <SettingsMenu open={settingsOpen} setOpen={setSettingsOpen} />
            <AssistantMenu open={assistantOpen} setOpen={setAssistantOpen} />
            <TutorialMenu open={tutorialOpen} setOpen={setTutorialOpen} />
        </Box>
    )
}

export default MainGame
