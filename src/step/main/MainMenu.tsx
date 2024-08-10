import { FC } from 'react'
import { BoardModel } from './BoardModel.tsx'

const MainMenu: FC<{ setStep: any }> = ({ setStep }) => {
    return (
        <>
            <BoardModel />
        </>
    )
}

export default MainMenu
