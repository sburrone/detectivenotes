export enum Step {
    MAIN = 'main',
    SETUP = 'setup',
    GAME = 'game',
}

export enum BoardIcon {
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
    values: { icon: BoardIcon; badge: number }[]
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
    ts?: number
    players?: string[]
    board?: Board
    locked?: boolean
    gameBoard?: GameBoardRow[]
    advancedCards?: AdvancedCardSetup
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

export type ButtonVariant = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text'

export type ButtonColor =
    | 'primary'
    | 'info'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'inherit'
    | 'default'
    | 'tertiary'

export type ToolbarPosition = 'bottom' | 'top'

export type PlayerNamesPosition = "default" | "vertical"

export type SelectionModalOptions = "minimal" | "no_numbers" | "full"

export type Settings = {
    toolbarPosition: ToolbarPosition
    autocomplete: boolean
    forceAssistantUpdate: boolean
    hideDustCounter: boolean
    playerNamesPosition: PlayerNamesPosition
    selectionModalOptions: SelectionModalOptions
}