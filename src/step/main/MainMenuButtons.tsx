import { FC, useEffect, useState } from 'react'
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import {
    AddToHomeScreen,
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
import { useGameStore } from '../../store/useGameStore.ts'

const MainMenuButtons: FC<{
    setStep: (step: Step) => void
    hideUI: boolean
    setHideUI: (hideUI: boolean) => void
}> = ({ setStep, hideUI }) => {
    const theme = useTheme()

    const { ts, board, players } = useGameStore()
    const { colorMode, setColorMode } = useSettingsStore()

    const [languageExtended, setLanguageExtended] = useState(window.innerWidth >= 500)

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
                    // onDoubleClick={(e: Event) => {
                    //     e.preventDefault()
                    //     if ((e.target as HTMLElement).ariaLabel === 'background') {
                    //         setHideUI(true)
                    //     }
                    // }}
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
                                    text={'TBD New'}
                                    textProps={{
                                        fontSize: '1.25rem',
                                        margin: 'auto 0 auto 0.5rem',
                                    }}
                                />
                            }
                            onClick={() => setStep(Step.SETUP)}
                            headerColor={(theme.palette as any).primaryContainer?.main}
                            style={{ margin: '0 auto' }}
                        />
                        {ts && (
                            <CardButton
                                header={
                                    <TextWithIcon
                                        icon={<Save />}
                                        text={'TBD Continue'}
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
                                >
                                    TBD Language
                                </Button>
                            ) : (
                                <IconMenuButton>
                                    <Language />
                                </IconMenuButton>
                            )}
                            <IconMenuButton>
                                <AddToHomeScreen />
                            </IconMenuButton>
                            <IconMenuButton
                                onClick={() =>
                                    setColorMode(colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT)
                                }
                            >
                                {colorMode === ColorMode.LIGHT ? <DarkMode /> : <LightMode />}
                            </IconMenuButton>
                            <IconMenuButton>
                                <Info />
                            </IconMenuButton>
                        </div>
                    </>
                </Stack>
            )}
        </>
    )
}

export default MainMenuButtons
