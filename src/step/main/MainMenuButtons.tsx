import { FC } from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { AddToHomeScreen, DarkMode, Info, Language, LightMode, PlayArrow } from '@mui/icons-material'
import CustomIconButton from '../../components/CustomIconButton.tsx'
import { ColorMode, Game, Step } from '../../types.ts'
import CardButton from '../../components/CardButton.tsx'

const MainMenuButtons: FC<{
    setStep: (step: Step) => any
    hideUI: boolean
    setHideUI: (hideUI: boolean) => any
    setColorMode: (colorMode: ColorMode) => any
    colorMode: ColorMode
    game: Game | null
}> = ({ setStep, hideUI, setHideUI, colorMode, setColorMode, game }) => {
    const theme = useTheme()

    return (
        <>
            {!hideUI && (
                <Stack
                    aria-label={'background'}
                    style={{
                        position: 'fixed',
                        top: 0,
                        height: '100vh',
                        width: '100vw',
                    }}
                    onDoubleClick={(e: Event) => {
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
                                fontSize: '5rem',
                                margin: '24px auto',
                                textAlign: 'center',
                                color: theme.palette.primary.main,
                                textShadow: (theme.palette as any).onPrimaryContainer.main,
                                webkitTextStroke: (theme.palette as any).onPrimary.contrastText,
                            }}
                        >
                            detective
                            <br />
                            notes
                        </Typography>
                        <Button
                            startIcon={<PlayArrow />}
                            variant={'tonal'}
                            style={{
                                width: '20rem',
                                margin: '0 auto',
                            }}
                            onClick={() => setStep(Step.SETUP)}
                        >
                            TBD New
                        </Button>
                        <CardButton
                            header={'TBD New'}
                            content={'TBD Begin Setup'}
                            onClick={() => setStep(Step.SETUP)}
                            headerColor={(theme.palette as any).secondaryContainer.main}
                        />
                        {game && (
                            <Button
                                startIcon={<PlayArrow />}
                                variant={'tonal'}
                                style={{
                                    width: '20rem',
                                    margin: '1em auto',
                                }}
                                onClick={() => setStep(Step.GAME)}
                            >
                                TBD Continue
                            </Button>
                        )}
                        <div
                            style={{
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                margin: 16,
                            }}
                        >
                            <Button
                                startIcon={
                                    <Language
                                        style={{
                                            fontSize: '2rem',
                                        }}
                                    />
                                }
                                sx={{ margin: '4px' }}
                                variant={'filled'}
                            >
                                TBD Language
                            </Button>
                            <CustomIconButton>
                                <AddToHomeScreen />
                            </CustomIconButton>
                            <CustomIconButton
                                onClick={() =>
                                    setColorMode(colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT)
                                }
                            >
                                {colorMode === ColorMode.LIGHT ? <DarkMode /> : <LightMode />}
                            </CustomIconButton>
                            <CustomIconButton>
                                <Info />
                            </CustomIconButton>
                        </div>
                    </>
                </Stack>
            )}
        </>
    )
}

export default MainMenuButtons
