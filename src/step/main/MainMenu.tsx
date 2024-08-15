import { FC, useState } from 'react'
import { BoardModel } from './BoardModel.tsx'
import MainMenuButtons from './MainMenuButtons.tsx'

const MainMenu: FC<{ setStep: any }> = ({ setStep }) => {
    const [hideUI, setHideUI] = useState(false)
    return (
        <>
            <BoardModel hideUI={hideUI} setHideUI={setHideUI} />
            <MainMenuButtons
                setStep={setStep}
                hideUI={hideUI}
                setHideUI={setHideUI}
            />
        </>
    )
}

export default MainMenu
