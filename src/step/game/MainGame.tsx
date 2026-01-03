import { FC, Fragment, useRef, useState } from 'react'
import { Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import { Add, MoreVert, Remove } from '@mui/icons-material'
import '../../App.css'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'
import { SettingsMenu } from '../../settings/SettingsMenu.tsx'
import { Box, Menu, Stack, Typography, useTheme } from '@mui/material'
import { useMainGameButtons } from './useMainGameButtons.tsx'
import { AssistantMenu } from './AssistantMenu.tsx'
import { TutorialMenu } from './TutorialMenu.tsx'
import { useGameStore } from '../../store/useGameStore.ts'
import { useIntl } from 'react-intl'
import { useSettingsStore } from '../../store/useSettingsStore.ts'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { useSplitscreen } from '../../hooks/useSplitscreen.ts'
import { InfoPanel } from './InfoPanel.tsx'

interface IGameProps {
    setStep: (step: Step) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [assistantOpen, setAssistantOpen] = useState(false)
    const [tutorialOpen, setTutorialOpen] = useState(false)
    const [moreAnchorEl, setMoreAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [showVerticalName, setShowVerticalName] = useState(true)

    const [infoPanelPlayer, setInfoPanelPlayer] = useState<string | null>(null)

    const boardRef = useRef<HTMLDivElement | null>(null)

    const { board, dustCounter, updateDustCounter } = useGameStore()
    const { hideDustCounter, colorMode } = useSettingsStore()
    const splitscreenMode = useSplitscreen()

    const theme = useTheme()
    const { formatMessage } = useIntl()

    const { shownButtons, hiddenButtons } = useMainGameButtons(
        setStep,
        setSettingsOpen,
        setAssistantOpen,
        setTutorialOpen,
        setMoreAnchorEl
    )

    const boardBox = (
        <Box
            ref={boardRef}
            sx={{ overflow: 'auto', flex: 1 }}
            onScroll={() => {
                if (!boardRef.current?.scrollTop && !showVerticalName) {
                    setShowVerticalName(true)
                } else if (boardRef.current?.scrollTop && showVerticalName) {
                    setShowVerticalName(false)
                }
            }}
        >
            <MainBoard
                showVerticalName={showVerticalName}
                infoPanelPlayer={infoPanelPlayer}
                setInfoPanelPlayer={setInfoPanelPlayer}
            />
        </Box>
    )

    const secondScreenContent = (
        <>
            <Separator className={`separator separator-${colorMode}`} />
            <Panel>
                <SettingsMenu open={settingsOpen} setOpen={setSettingsOpen} disableModal />
                <AssistantMenu
                    open={assistantOpen || (!settingsOpen && !infoPanelPlayer)}
                    setOpen={setAssistantOpen}
                    disableModal
                />
                <TutorialMenu open={tutorialOpen} setOpen={setTutorialOpen} disableModal />
                <InfoPanel
                    open={!!infoPanelPlayer}
                    setOpen={(open) => setInfoPanelPlayer(open ? infoPanelPlayer : null)}
                    player={infoPanelPlayer}
                    disableModal
                />
            </Panel>
        </>
    )

    return (
        <Group style={{ width: '100dvw', height: '100dvh' }} orientation={splitscreenMode || undefined}>
            <Panel>
                <Box sx={{ display: 'flex', maxHeight: '100dvh', flexDirection: 'column' }}>
                    <UpperBar
                        style={{
                            margin: 'auto',
                            gap: 4,
                            paddingTop: 4,
                            paddingBottom: 4,
                            width: '100dw',
                            overflow: 'hidden',
                        }}
                    >
                        {shownButtons.map((b) => (
                            <Fragment key={b.id}>{b.el}</Fragment>
                        ))}
                        {!!hiddenButtons.length && (
                            <IconButton
                                variant={'elevated'}
                                onClick={(e) => setMoreAnchorEl(e.target as HTMLButtonElement)}
                            >
                                <MoreVert />
                            </IconButton>
                        )}
                    </UpperBar>
                    {board?.id === 5 && !hideDustCounter && (
                        <UpperBar
                            bgColor={(theme.palette as any).secondaryContainer.main}
                            style={{ margin: 'auto', gap: 4, width: '100dw', overflow: 'hidden' }}
                        >
                            <IconButton
                                variant={'elevated'}
                                onClick={() => updateDustCounter(Math.max((dustCounter ?? 0) - 1, 0))}
                            >
                                <Remove sx={{ fontSize: '1rem' }} />
                            </IconButton>
                            <Stack direction={'column'} paddingInline={8}>
                                <Typography align={'center'}>{formatMessage({ id: 'dustCounter' })}</Typography>
                                <Typography align={'center'}>{dustCounter}</Typography>
                            </Stack>
                            <IconButton
                                variant={'elevated'}
                                onClick={() => updateDustCounter(Math.min((dustCounter ?? 0) + 1, 99))}
                            >
                                <Add sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        </UpperBar>
                    )}

                    {splitscreenMode === 'horizontal' ? (
                        <Group style={{ width: '100dvw' }} orientation={splitscreenMode || undefined}>
                            <Panel>{boardBox}</Panel>
                            {secondScreenContent}
                        </Group>
                    ) : (
                        boardBox
                    )}

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

                    <SettingsMenu open={settingsOpen && !splitscreenMode} setOpen={setSettingsOpen} />
                    <AssistantMenu open={assistantOpen && !splitscreenMode} setOpen={setAssistantOpen} />
                    <TutorialMenu open={tutorialOpen && !splitscreenMode} setOpen={setTutorialOpen} />
                </Box>
            </Panel>

            {splitscreenMode === 'vertical' && secondScreenContent}
        </Group>
    )
}

export default MainGame
