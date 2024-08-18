import { useMemo, useState } from 'react'
import './App.css'
import { ColorMode, Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'
import { IntlProvider } from 'react-intl'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { themes } from './themes.ts'

function App() {
    const [step, setStep] = useState<Step>(Step.MAIN)
    const [colorMode, setColorMode] = useState<ColorMode>(
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ColorMode.DARK
            : ColorMode.LIGHT
    )

    const theme = useMemo(
        () => createTheme(themes[colorMode] as unknown as ThemeOptions),
        [colorMode]
    )
    console.log('bg', theme.palette.background.default)
    return (
        <ThemeProvider theme={theme}>
            <IntlProvider locale={'en-US'} messages={{ AA: 'BB' }}>
                <div
                    style={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {step === Step.MAIN && (
                        <MainMenu
                            setStep={setStep}
                            colorMode={colorMode}
                            setColorMode={setColorMode}
                        />
                    )}
                </div>
            </IntlProvider>
        </ThemeProvider>
    )
}

export default App
