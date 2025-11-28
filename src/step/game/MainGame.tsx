import { FC, useState } from 'react'
import { Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import { MoreVert } from '@mui/icons-material'
import '../../App.css'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'
import { SettingsMenu } from '../../settings/SettingsMenu.tsx'
import { Box, Menu } from '@mui/material'
import { useMainGameButtons } from './useMainGameButtons.tsx'

interface IGameProps {
    setStep: (step: Step) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLButtonElement | null>(null)

    const { shownButtons, hiddenButtons } = useMainGameButtons(setStep, setSettingsOpen)

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
                slotProps={{ list: { sx: { paddingInline: 12 } } }}
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
