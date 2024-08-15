import { useState } from 'react'
import './App.css'
import { Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

function App() {
    const [step, setStep] = useState<Step>(Step.MAIN)

    return (
        <CssBaseline>
            <CssVarsProvider>
                <div>
                    {step === Step.MAIN && <MainMenu setStep={setStep} />}
                </div>
            </CssVarsProvider>
        </CssBaseline>
    )
}

export default App
