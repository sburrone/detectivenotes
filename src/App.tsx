import { useMemo, useState } from 'react'
import './App.css'
import { Game, Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'
import { IntlProvider } from 'react-intl'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { themes } from './themes.ts'
import Setup from './step/setup/Setup.tsx'
import { usePersistedState } from './usePersistedState.ts'
import MainGame from './step/game/MainGame.tsx'
import _ from 'lodash'
import { store } from './store/store.ts'
import { Provider, useSelector } from 'react-redux'
import { selectColorMode } from './store/settingsSlice.ts'

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

function AppContent() {
    const [step, setStep] = useState<Step>(Step.MAIN)
    const localGame = localStorage.getItem('game')
    const [game, setGame] = usePersistedState<Game | null>(
        localGame ? (JSON.parse(localStorage.getItem('game')!) as Game) : null,
        'game'
    )

    const colorMode = useSelector(selectColorMode)

    const updateGame = (prop: keyof Game, newValue: any) => {
        if (game) {
            const newObject = _.clone(game)
            newObject[prop] = newValue
            if ((newObject as any).ts) (newObject as any).ts = Date.now()
            setGame(newObject)
        }
    }

    const theme = useMemo(() => createTheme(themes[colorMode] as unknown as ThemeOptions), [colorMode])

    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={'en-US'} messages={{ AA: 'BB' }}>
                <div
                    style={{
                        backgroundColor: theme.palette.background.default,
                        minHeight: step === Step.MAIN ? undefined : '100dvh',
                    }}
                >
                    {step === Step.MAIN && <MainMenu setStep={setStep} game={game} />}
                    {step === Step.SETUP && <Setup setStep={setStep} />}
                    {step === Step.GAME && <MainGame setStep={setStep} updateGame={updateGame} />}
                </div>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
