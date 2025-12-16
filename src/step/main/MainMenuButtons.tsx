import { FC, useEffect, useState } from 'react'
import { Button, Grid, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import {
    CasinoOutlined,
    DarkMode,
    Info,
    Language,
    LightMode,
    PersonOutlined,
    PlayArrow,
    Save,
    Schedule,
} from '@mui/icons-material'
import { IconMenuButton } from '../../components/CustomButtons.tsx'
import { ColorMode, Step } from '../../types.ts'
import CardButton from '../../components/CardButton.tsx'
import TextWithIcon from '../../components/TextWithIcon.tsx'
import { useSettingsStore } from '../../store/useSettingsStore.ts'
import { blankGame, useGameStore } from '../../store/useGameStore.ts'
import { useIntl } from 'react-intl'
import { Language as SupportedLanguage } from '../../types.ts'
import { CustomModal } from '../../components/CustomModal.tsx'
import { version } from '../../../package.json'

const MainMenuButtons: FC<{
    setStep: (step: Step) => void
    hideUI: boolean
    setHideUI: (hideUI: boolean) => void
}> = ({ setStep, hideUI, setHideUI }) => {
    const theme = useTheme()
    const { formatMessage } = useIntl()

    const { ts, board, players, setGame } = useGameStore()
    const { colorMode, setColorMode, lang, setLanguage } = useSettingsStore()
    const { clear } = useGameStore.temporal.getState()

    const [languageExtended, setLanguageExtended] = useState(window.innerWidth >= 500)
    const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [infoModalOpen, setInfoModalOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => setLanguageExtended(window.innerWidth >= 500)
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <>
            {!hideUI && (
                <Stack
                    component={'div'}
                    aria-label={'background'}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        height: '100dvh',
                        width: '100dvw',
                    }}
                    onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.preventDefault()
                        if ((e.target as HTMLElement).ariaLabel === 'background') {
                            setHideUI(true)
                        }
                    }}
                >
                    <>
                        <Typography
                            sx={{
                                fontFamily: 'Dela Gothic One',
                                fontSize: '4rem',
                                margin: '24px auto',
                                textAlign: 'center',
                                color: theme.palette.primary.main,
                                textShadow: (theme.palette as any).onPrimaryContainer?.main,
                                webkitTextStroke: (theme.palette as any).onPrimary?.contrastText,
                            }}
                        >
                            detective
                            <br />
                            notes
                        </Typography>
                        <CardButton
                            header={
                                <TextWithIcon
                                    icon={<PlayArrow />}
                                    text={formatMessage({ id: 'new' })}
                                    textProps={{
                                        fontSize: '1.25rem',
                                        margin: 'auto 0 auto 0.5rem',
                                    }}
                                />
                            }
                            content={
                                ts && (
                                    <Typography align={'center'}>{formatMessage({ id: 'newGame.warning' })}</Typography>
                                )
                            }
                            onClick={() => {
                                setStep(Step.SETUP)
                                setGame(blankGame)
                                clear()
                            }}
                            headerColor={(theme.palette as any).primaryContainer?.main}
                            style={{ margin: '0 auto' }}
                        />
                        {ts && (
                            <CardButton
                                header={
                                    <TextWithIcon
                                        icon={<Save />}
                                        text={formatMessage({ id: 'continue' })}
                                        textProps={{
                                            fontSize: '1.25rem',
                                            margin: 'auto 0 auto 0.5rem',
                                        }}
                                    />
                                }
                                content={
                                    <Grid container spacing={4}>
                                        <Grid size={{ lg: 4, md: 12 }}>
                                            <TextWithIcon
                                                icon={<Schedule />}
                                                text={new Date(ts!).toLocaleDateString(undefined, {
                                                    weekday: 'short',
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: '2-digit',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                })}
                                            />
                                        </Grid>
                                        <Grid size={{ lg: 4, md: 12 }}>
                                            <TextWithIcon icon={<CasinoOutlined />} text={board!.name} />
                                        </Grid>
                                        <Grid size={{ lg: 4, md: 12 }}>
                                            <TextWithIcon
                                                icon={<PersonOutlined />}
                                                text={players!.toLocaleString().replaceAll(',', ', ')}
                                            />
                                        </Grid>
                                    </Grid>
                                }
                                onClick={() => setStep(Step.GAME)}
                                headerColor={(theme.palette as any).secondaryContainer?.main}
                                style={{ margin: '1em auto' }}
                            />
                        )}
                        <div
                            style={{
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                margin: 16,
                            }}
                        >
                            {languageExtended ? (
                                <Button
                                    startIcon={
                                        <Language
                                            style={{
                                                fontSize: '2rem',
                                            }}
                                        />
                                    }
                                    sx={{ margin: '4px' }}
                                    onClick={(e) => setLanguageMenuAnchorEl(e.currentTarget)}
                                >
                                    {formatMessage({ id: 'language' })}
                                </Button>
                            ) : (
                                <IconMenuButton onClick={(e) => setLanguageMenuAnchorEl(e.currentTarget)}>
                                    <Language />
                                </IconMenuButton>
                            )}
                            <Menu
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                open={!!languageMenuAnchorEl}
                                anchorEl={languageMenuAnchorEl}
                                onClick={() => setLanguageMenuAnchorEl(null)}
                            >
                                {Object.values(SupportedLanguage).map((opt) => (
                                    <MenuItem
                                        disabled={lang === opt}
                                        key={opt}
                                        onClick={() => {
                                            setLanguageMenuAnchorEl(null)
                                            setLanguage(opt)
                                        }}
                                    >
                                        {new Intl.DisplayNames([opt], { type: 'language' }).of(opt)}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconMenuButton
                                onClick={() =>
                                    setColorMode(colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT)
                                }
                            >
                                {colorMode === ColorMode.LIGHT ? <DarkMode /> : <LightMode />}
                            </IconMenuButton>
                            <IconMenuButton onClick={() => setInfoModalOpen(true)}>
                                <Info />
                            </IconMenuButton>
                        </div>
                    </>
                </Stack>
            )}

            <CustomModal
                open={infoModalOpen}
                setOpen={() => setInfoModalOpen(false)}
                color={'primary'}
                title={'Detective Notes'}
            >
                <Typography align={'center'}>{formatMessage({ id: 'credits.version' }, { version })}</Typography>
                <Typography align={'center'}>{formatMessage({ id: 'credits.madeWith' })}</Typography>
                <Typography align={'center'} sx={{ '& a': { color: theme.palette.text.primary } }}>
                    {formatMessage(
                        { id: 'credits.license' },
                        {
                            model: (
                                <a
                                    href="https://sketchfab.com/3d-models/clue-board-game-843af04381cc495ca5f0a4bebadb1752"
                                    target="_blank"
                                >
                                    "Clue (Board Game)"
                                </a>
                            ),
                            author: (
                                <a href="https://sketchfab.com/paulyanez" target="_blank">
                                    Anthony Yanez
                                </a>
                            ),
                            license: (
                                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
                                    CC-BY-4.0
                                </a>
                            ),
                        }
                    )}
                </Typography>
            </CustomModal>
        </>
    )
}

export default MainMenuButtons
