import { useState } from 'react'
import './App.css'
import { Step } from './types'
import MainMenu from './step/main/MainMenu.tsx'

function App() {
    const [step, setStep] = useState<Step>(Step.MAIN)

    return <div>{step === Step.MAIN && <MainMenu setStep={setStep} />}</div>
}

export default App
