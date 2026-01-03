import { create } from 'zustand/react'
import { devtools, persist } from 'zustand/middleware'
import { BoardIcon } from '../types.ts'

export interface BoardButtonModalStore {
    open: boolean
    setOpen: (open: boolean) => void
    item?: string
    player?: number
    setItem: (item?: string) => void
    setPlayer: (player?: number) => void
    icon?: BoardIcon
    number?: number
    setIcon: (icon?: BoardIcon) => void
    setNumber: (number?: number) => void
}

export const useBoardButtonModalStore = create<BoardButtonModalStore>()(
    devtools(
        persist(
            (set) => ({
                open: false,
                setOpen: (open: boolean) => set({ open }),
                item: undefined,
                player: undefined,
                setItem: (item) => set({ item }),
                setPlayer: (player) => set({ player }),
                icon: undefined,
                number: undefined,
                setIcon: (icon) => set({ icon }),
                setNumber: (number) => set({ number }),
            }),
            {
                name: 'boardButtonModal',
            }
        )
    )
)
