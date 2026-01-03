import { create } from 'zustand/react'
import { ColorMode, Language, PlayerNamesPosition, SelectionModalOption, Settings, ToolbarPosition } from '../types.ts'
import { devtools, persist } from 'zustand/middleware'

export interface SettingsStore extends Settings {
    setToolbarPosition: (position: ToolbarPosition) => void
    setAutocomplete: (autocomplete: boolean) => void
    setForceAssistantUpdate: (forceAssistantUpdate: boolean) => void
    setHideDustCounter: (hideDustCounter: boolean) => void
    setPlayerNamesPosition: (playerNamesPosition: PlayerNamesPosition) => void
    setSelectionModalOptions: (selectionModalOptions: SelectionModalOption) => void
    setColorMode: (colorMode: ColorMode) => void
    toggleColorMode: () => void
    setLanguage: (lang: Language) => void
    setSplitscreenEnabled: (splitscreenEnabled: true) => void
}

export const useSettingsStore = create<SettingsStore>()(
    devtools(
        persist(
            (set, get) => ({
                toolbarPosition: ToolbarPosition.top,
                autocomplete: true,
                forceAssistantUpdate: false,
                hideDustCounter: false,
                playerNamesPosition: PlayerNamesPosition.default,
                selectionModalOptions: SelectionModalOption.minimal,
                colorMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorMode.DARK : ColorMode.LIGHT,
                lang: navigator.language.includes('it') ? Language.IT : Language.EN,
                splitscreenEnabled: false,
                setToolbarPosition: (position: ToolbarPosition) => set({ toolbarPosition: position }),
                setAutocomplete: (autocomplete: boolean) => set({ autocomplete: autocomplete }),
                setForceAssistantUpdate: (forceAssistantUpdate: boolean) =>
                    set({ forceAssistantUpdate: forceAssistantUpdate }),
                setHideDustCounter: (hideDustCounter: boolean) => set({ hideDustCounter: hideDustCounter }),
                setPlayerNamesPosition: (playerNamesPosition: PlayerNamesPosition) =>
                    set({ playerNamesPosition: playerNamesPosition }),
                setSelectionModalOptions: (selectionModalOptions: SelectionModalOption) =>
                    set({ selectionModalOptions: selectionModalOptions }),
                setColorMode: (colorMode: ColorMode) => set({ colorMode: colorMode }),
                toggleColorMode: () =>
                    set({ colorMode: get().colorMode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK }),
                setLanguage: (lang: Language) => set({ lang }),
                setSplitscreenEnabled: (splitscreenEnabled: boolean) => set({ splitscreenEnabled: splitscreenEnabled }),
            }),
            {
                name: 'settings',
            }
        )
    )
)
