import { FC, useState } from 'react'
import { BoardModel } from './BoardModel.tsx'
import MainMenuButtons from './MainMenuButtons.tsx'
import { Game, Step } from '../../types.ts'

const MainMenu: FC<{
    setStep: (step: Step) => any
    game: Game | null
}> = ({ setStep, game }) => {
    const [hideUI, setHideUI] = useState(false)
    return (
        <>
            <BoardModel hideUI={hideUI} setHideUI={setHideUI} />
            <MainMenuButtons setStep={setStep} hideUI={hideUI} setHideUI={setHideUI} game={game} />
        </>
    )
}

export default MainMenu
