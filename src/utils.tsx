import {
    Cancel,
    CheckCircle,
    Error,
    Face2TwoTone,
    Face3TwoTone,
    Face4TwoTone,
    Face5TwoTone,
    Face6TwoTone,
    FaceTwoTone,
    FlagCircle,
    Help,
    NextPlan,
    PanoramaFishEye,
    Stars,
} from '@mui/icons-material'
import { Board, BoardIcon, Game, GameBoardRow } from './types.ts'
import { ReactElement } from 'react'

export const faces = [
    <FaceTwoTone color={'secondary'} />,
    <Face2TwoTone color={'secondary'} />,
    <Face3TwoTone color={'secondary'} />,
    <Face4TwoTone color={'secondary'} />,
    <Face5TwoTone color={'secondary'} />,
    <Face6TwoTone color={'secondary'} />,
]

export const getBoardIcon = (boardIcon: BoardIcon): ReactElement => {
    switch (boardIcon) {
        case BoardIcon.CHECK:
            return <CheckCircle sx={{ fill: '#36a655' }} />
        case BoardIcon.MAYBE:
            return <CheckCircle sx={{ fill: '#77a984' }} />
        case BoardIcon.CROSS:
            return <Cancel sx={{ fill: '#d85a4b' }} />
        case BoardIcon.MAYBE_NOT:
            return <Cancel sx={{ fill: '#d79992' }} />
        case BoardIcon.FLAG:
            return <FlagCircle sx={{ fill: '#f68f47' }} />
        case BoardIcon.EXCLAMATION:
            return <Error sx={{ fill: '#d876b8' }} />
        case BoardIcon.QUESTION:
            return <Help sx={{ fill: '#48a0dd' }} />
        case BoardIcon.SKIP:
            return <NextPlan sx={{ fill: '#824df5' }} />
        case BoardIcon.STAR:
            return <Stars sx={{ fill: '#eecc48' }} />
        case BoardIcon.RESET:
        default:
            return <PanoramaFishEye sx={{ fill: '#c6e6d4' }} />
    }
}

export const getBoardItems = (board: Board) => {
    return board.characters.concat(board.weapons).concat(board.rooms)
}

export const initializeBoard = (board: Board, players: string[]): GameBoardRow[] => {
    return getBoardItems(board).map((item) => ({
        item: item,
        locked: false,
        values: Array(players.length).fill(BoardIcon.RESET),
    }))
}

export const saveGame = (game: Game) => {
    localStorage.setItem('game', JSON.stringify(game))
}
