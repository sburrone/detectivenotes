export enum Step {
    MAIN = 'main',
    SETUP = 'setup',
    GAME = 'game',
}

export type Board = {
    id: number
    name: string
    minPlayers: number
    characters: string[]
    weapons: string[]
    rooms: string[]
}
