import { create } from 'zustand/react'
import { AdvancedCardSetup, Board, BoardIcon, Game, GameBoardRow } from '../types.ts'
import { temporal } from 'zundo'
import { devtools, persist } from 'zustand/middleware'
import _ from 'lodash'

export interface GameStore extends Game {
    setGame: (game: Game) => void
    setBoard: (board: Board) => void
    setPlayers: (players: string[]) => void
    setOrToggleLocked: (locked?: boolean | undefined) => void
    setGameBoard: (gameBoard: GameBoardRow[]) => void
    setAdvancedCardSetup: (advancedCards: AdvancedCardSetup) => void
    updateGameBoardRow: (gameBoardRow: GameBoardRow) => void
    lockItem: (item: string) => void
    updateItem: ({
        item,
        playerIndex,
        value,
        badge,
        autocomplete,
    }: {
        item: string
        playerIndex: number
        value: BoardIcon
        badge: number
        autocomplete: boolean
    }) => void
}

export const useGameStore = create<GameStore>()(
    devtools(
        persist(
            temporal((set, get) => ({
                ts: undefined,
                players: undefined,
                board: undefined,
                locked: undefined,
                gameBoard: undefined,
                advancedCards: undefined,
                setGame: (game: Game) => set(game),
                setBoard: (board: Board) => set({ board, ts: Date.now() }),
                setPlayers: (players: string[]) => set({ players, ts: Date.now() }),
                setOrToggleLocked: (locked: boolean | undefined) =>
                    set({ locked: locked ?? !get().locked, ts: Date.now() }),
                setGameBoard: (gameBoard: GameBoardRow[]) => set({ gameBoard, ts: Date.now() }),
                setAdvancedCardSetup: (advancedCards: AdvancedCardSetup) => set({ advancedCards, ts: Date.now() }),
                updateGameBoardRow: (gameBoardRow: GameBoardRow) => {
                    if (get().gameBoard) {
                        const foundIndex = get().gameBoard?.findIndex((row) => row.item === gameBoardRow.item)
                        if (foundIndex !== undefined && foundIndex !== -1) {
                            const gameBoard = _.cloneDeep(get().gameBoard)!
                            _.set(gameBoard, `[${foundIndex}]`, {
                                ...gameBoard[foundIndex],
                                locked: gameBoardRow.locked,
                                values: gameBoardRow.values,
                            })
                            return set({ gameBoard, ts: Date.now() })
                        }
                    }
                    return set({ ts: Date.now() })
                },
                lockItem: (item: string) =>
                    set({
                        gameBoard: get().gameBoard?.map((row) => ({
                            ...row,
                            locked: row.item === item ? !row.locked : row.locked,
                        })),
                        ts: Date.now(),
                    }),
                updateItem: ({
                    item,
                    playerIndex,
                    value,
                    badge,
                    autocomplete,
                }: {
                    item: string
                    playerIndex: number
                    value: BoardIcon
                    badge: number
                    autocomplete: boolean
                }) => {
                    if (get().gameBoard) {
                        const foundIndex = get().gameBoard?.findIndex((row) => row.item === item)
                        if (foundIndex !== undefined && foundIndex !== -1) {
                            const gameBoard = _.cloneDeep(get().gameBoard)!
                            if (autocomplete && value === BoardIcon.CHECK) {
                                _.set(
                                    gameBoard,
                                    `[${foundIndex}].values`,
                                    gameBoard[foundIndex].values.map((v) => ({ badge: v.badge, icon: BoardIcon.CROSS }))
                                )
                            }
                            _.set(gameBoard, `[${foundIndex}].values[${playerIndex}]`, { icon: value, badge })
                            return set({ gameBoard, ts: Date.now() })
                        }
                    }
                    return set({ ts: Date.now() })
                },
            })),
            {
                name: 'game',
            }
        )
    )
)
