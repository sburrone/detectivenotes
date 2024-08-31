export enum Step {
    MAIN = 'main',
    SETUP = 'setup',
    GAME = 'game',
}

export enum Symbol {
    CHECK = 'check',
    RESET = 'reset',
    MAYBE = 'maybe',
    CROSS = 'cross',
    MAYBE_NOT = 'maybeNot',
    STAR = 'star',
    QUESTION = 'question',
    EXCLAMATION = 'exclamation',
    FLAG = 'flag',
    SKIP = 'skip',
}

export type Board = {
    id: number
    name: string
    minPlayers: number
    maxPlayers?: number
    characters: string[]
    weapons: string[]
    rooms: string[]
}

export type GameBoardRow = {
    item: string
    locked: boolean
    values: Symbol[]
}

export enum AdvancedCard {
    PUBLIC,
    ASSIGN,
    UNDEFINED,
    NOT_NEEDED,
}

export type AdvancedCardSetup = {
    type: AdvancedCard
    players?: number[]
}

export type Game = {
    ts: Date
    players: string[]
    board: Board
    locked: boolean
    gameBoard: GameBoardRow[]
    advancedCards: AdvancedCardSetup
}

export enum Item {
    SUSPECT = 'characters',
    WEAPON = 'weapons',
    ROOM = 'rooms',
}

export enum ColorMode {
    LIGHT = 'light',
    DARK = 'dark',
}
