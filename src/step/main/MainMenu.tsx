import { FC, useState } from 'react'
import { BoardModel } from './BoardModel.tsx'
import MainMenuButtons from './MainMenuButtons.tsx'
import { ColorMode, Step } from '../../types.ts'

const MainMenu: FC<{
    setStep: (step: Step) => any
    setColorMode: (colorMode: ColorMode) => any
    colorMode: ColorMode
}> = ({ setStep, setColorMode, colorMode }) => {
    const [hideUI, setHideUI] = useState(false)
    return (
        <>
            <BoardModel hideUI={hideUI} setHideUI={setHideUI} />
            <MainMenuButtons
                setStep={setStep}
                hideUI={hideUI}
                setHideUI={setHideUI}
                colorMode={colorMode}
                setColorMode={setColorMode}
            />
        </>
    )
}

export default MainMenu
