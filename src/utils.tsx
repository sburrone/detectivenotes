import { Face2TwoTone, Face3TwoTone, Face4TwoTone, Face5TwoTone, Face6TwoTone, FaceTwoTone } from '@mui/icons-material'
import { Board, Game, GameBoardRow, Symbol } from './types.ts'

export const faces = [
    <FaceTwoTone color={'secondary'} />,
    <Face2TwoTone color={'secondary'} />,
    <Face3TwoTone color={'secondary'} />,
    <Face4TwoTone color={'secondary'} />,
    <Face5TwoTone color={'secondary'} />,
    <Face6TwoTone color={'secondary'} />,
]

export const getBoardItems = (board: Board) => {
    return board.characters.concat(board.weapons).concat(board.rooms)
}

export const initializeBoard = (board: Board, players: string[]): GameBoardRow[] => {
    return getBoardItems(board).map((item) => ({
        item: item,
        locked: false,
        values: Array(players.length).fill(Symbol.RESET),
    }))
}

export const saveGame = (game: Game) => {
    localStorage.setItem('game', JSON.stringify(game))
}
