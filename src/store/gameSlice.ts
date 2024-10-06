import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AdvancedCardSetup, Board, Game, GameBoardRow, Symbol } from '../types'
import { RootState } from './store'
import { saveGame } from '../utils'

export type GameState = Game

const initialGameState: GameState = (JSON.parse(localStorage.getItem('game')!) as GameState) ?? {}

const setGameReducer = (state: GameState, action: PayloadAction<Game>) => {
    state = action.payload
    saveGame(state)
}

const setBoardReudcer = (state: GameState, action: PayloadAction<Board>) => {
    state.board = action.payload
    state.ts = Date.now()
    saveGame(state)
}

const setPlayersReducer = (state: GameState, action: PayloadAction<string[]>) => {
    state.players = action.payload
    state.ts = Date.now()
    saveGame(state)
}

const setOrToggleLockedReducer = (state: GameState, action: PayloadAction<boolean | undefined>) => {
    state.locked = action.payload ?? !state.locked
    state.ts = Date.now()
    saveGame(state)
}

const setGameBoardReducer = (state: GameState, action: PayloadAction<GameBoardRow[]>) => {
    state.gameBoard = action.payload
    state.ts = Date.now()
    saveGame(state)
}

const setAdvancedCardSetupReducer = (state: GameState, action: PayloadAction<AdvancedCardSetup>) => {
    state.advancedCards = action.payload
    state.ts = Date.now()
    saveGame(state)
}

const updateGameBoardRowReducer = (state: GameState, action: PayloadAction<GameBoardRow>) => {
    if (state.gameBoard) {
        const found = state.gameBoard.find((row) => row.item === action.payload.item)
        if (found) {
            found.locked = action.payload.locked
            found.values = action.payload.values
        }
    }
    state.ts = Date.now()
    saveGame(state)
}

const lockItemReducer = (state: GameState, action: PayloadAction<string>) => {
    if (state.gameBoard) {
        const found = state.gameBoard.find((row) => row.item === action.payload)
        if (found) {
            found.locked = !found.locked
        }
    }
    state.ts = Date.now()
    saveGame(state)
}

const updateItemReducer = (
    state: GameState,
    action: PayloadAction<{ item: string; playerIndex: number; value: Symbol }>
) => {
    if (state.gameBoard) {
        const found = state.gameBoard.find((row) => row.item === action.payload.item)
        if (found) {
            found.values[action.payload.playerIndex] = action.payload.value
        }
    }
    state.ts = Date.now()
    saveGame(state)
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        setBoardReudcer,
        setAdvancedCardSetupReducer,
        setGameBoardReducer,
        setOrToggleLockedReducer,
        setPlayersReducer,
        updateGameBoardRowReducer,
        updateItemReducer,
        lockItemReducer,
        setGameReducer,
    },
})

export const {
    setAdvancedCardSetupReducer: setAdvancedCardSetup,
    setBoardReudcer: setBoard,
    setGameBoardReducer: setGameBoard,
    setOrToggleLockedReducer: setOrToggleLocked,
    setPlayersReducer: setPlayers,
    updateGameBoardRowReducer: updateGameBoardRow,
    updateItemReducer: updateItem,
    lockItemReducer: lockItem,
    setGameReducer: setGame,
} = gameSlice.actions

export const selectBoard = (state: RootState) => state.game.board

export const selectAdvancedCardSetup = (state: RootState) => state.game.board

export const selectGameBoard = (state: RootState) => state.game.gameBoard

export const selectLocked = (state: RootState) => state.game.locked

export const selectPlayers = (state: RootState) => state.game.players

export const selectGame = (state: RootState) => state.game

export default gameSlice.reducer
