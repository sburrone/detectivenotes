import { ColorMode, PlayerNamesPosition, SelectionModalOption, Settings, ToolbarPosition } from '../types.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveSettings } from '../utils.tsx'
import { RootState } from './store.ts'

export type SettingsState = Settings

const initialSettingsState: SettingsState = (JSON.parse(localStorage.getItem('settings')!) as SettingsState) ?? {
    toolbarPosition: 'top',
    autocomplete: true,
    forceAssistantUpdate: false,
    hideDustCounter: false,
    playerNamesPosition: 'default',
    selectionModalOptions: 'minimal',
    colorMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? ColorMode.DARK : ColorMode.LIGHT
}

const setToolbarPositionReducer = (state: SettingsState, action: PayloadAction<ToolbarPosition>) => {
    state.toolbarPosition = action.payload
    saveSettings(state)
}

const setAutocompleteReducer = (state: SettingsState, action: PayloadAction<boolean>) => {
    state.autocomplete = action.payload
    saveSettings(state)
}

const setForceAssistantUpdateReducer = (state: SettingsState, action: PayloadAction<boolean>) => {
    state.forceAssistantUpdate = action.payload
    saveSettings(state)
}

const setHideDustCounterReducer = (state: SettingsState, action: PayloadAction<boolean>) => {
    state.hideDustCounter = action.payload
    saveSettings(state)
}

const setPlayerNamesPositionReducer = (state: SettingsState, action: PayloadAction<PlayerNamesPosition>) => {
    state.playerNamesPosition = action.payload
    saveSettings(state)
}

const setSelectionModalOptionsReducer = (state: SettingsState, action: PayloadAction<SelectionModalOption>) => {
    state.selectionModalOptions = action.payload
    saveSettings(state)
}

const setColorModeReducer = (state: SettingsState, action: PayloadAction<ColorMode>) => {
    state.colorMode = action.payload
    saveSettings(state)
}

const toggleColorModeReducer = (state: SettingsState) => {
    state.colorMode = state.colorMode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        setToolbarPositionReducer,
        setAutocompleteReducer,
        setForceAssistantUpdateReducer,
        setHideDustCounterReducer,
        setPlayerNamesPositionReducer,
        setSelectionModalOptionsReducer,
        setColorModeReducer,
        toggleColorModeReducer
    },
})

export const {
    setToolbarPositionReducer: setToolbarPosition,
    setAutocompleteReducer: setAutocomplete,
    setForceAssistantUpdateReducer: setForceAssistantUpdate,
    setHideDustCounterReducer: setHideDustCounter,
    setPlayerNamesPositionReducer: setPlayerNamesPosition,
    setSelectionModalOptionsReducer: setSelectionModalOptions,
    setColorModeReducer: setColorMode,
    toggleColorModeReducer: toggleColorMode
} = settingsSlice.actions

export const selectToolbarPosition = (state: RootState) => state.settings.toolbarPosition

export const selectAutocomplete = (state: RootState) => state.settings.autocomplete

export const selectForceAssistantUpdate = (state: RootState) => state.settings.forceAssistantUpdate

export const selectHideDustCounter = (state: RootState) => state.settings.hideDustCounter

export const selectPlayerNamesPosition = (state: RootState) => state.settings.playerNamesPosition

export const selectSelectionModalOptions = (state: RootState) => state.settings.selectionModalOptions

export const selectColorMode = (state: RootState) => state.settings.colorMode

export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer
