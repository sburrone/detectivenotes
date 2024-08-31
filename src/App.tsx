import { useMemo, useState } from 'react'
import './App.css'
import { ColorMode, Game, Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'
import { IntlProvider } from 'react-intl'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { themes } from './themes.ts'
import Setup from './step/setup/Setup.tsx'
import { usePersistedState } from './usePersistedState.ts'
import MainGame from './step/game/MainGame.tsx'

function App() {
    const [step, setStep] = useState<Step>(Step.MAIN)
    const local = localStorage.getItem('game')
    const [game, setGame] = usePersistedState<Game | null>(
        local ? (JSON.parse(localStorage.getItem('game')!) as Game) : null,
        'game'
    )
    const [colorMode, setColorMode] = useState<ColorMode>(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorMode.DARK : ColorMode.LIGHT
    )

    const theme = useMemo(() => createTheme(themes[colorMode] as unknown as ThemeOptions), [colorMode])

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={'en-US'} messages={{ AA: 'BB' }}>
                <div
                    style={{
                        backgroundColor: theme.palette.background.default,
                        minHeight: step === Step.MAIN ? undefined : '100vh',
                    }}
                >
                    {step === Step.MAIN && (
                        <MainMenu setStep={setStep} colorMode={colorMode} setColorMode={setColorMode} game={game} />
                    )}
                    {step === Step.SETUP && <Setup setStep={setStep} setGame={setGame} />}
                    {step === Step.GAME && <MainGame setGame={setGame} game={game!} />}
                </div>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
