import { FC } from 'react'
import { Game } from '../../types.ts'

interface IGameProps {
    game: Game
    setGame: (game: Game) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { game, setGame } = props
    return <div></div>
}

export default MainGame
