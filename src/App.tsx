import { useMemo, useState } from 'react'
import './App.css'
import { Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'
import { IntlProvider } from 'react-intl'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { themes } from './themes.ts'
import Setup from './step/setup/Setup.tsx'
import MainGame from './step/game/MainGame.tsx'
import { useSettingsStore } from './store/useSettingsStore.ts'

function App() {
    return <AppContent />
}

function AppContent() {
    const [step, setStep] = useState<Step>(Step.MAIN)
    const { colorMode } = useSettingsStore()

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
                    {step === Step.MAIN && <MainMenu setStep={setStep} />}
                    {step === Step.SETUP && <Setup setStep={setStep} />}
                    {step === Step.GAME && <MainGame setStep={setStep} />}
                </div>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
