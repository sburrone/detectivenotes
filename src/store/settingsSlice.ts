import { PlayerNamesPosition, SelectionModalOptions, Settings, ToolbarPosition } from '../types.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveSettings } from '../utils.tsx'

export type SettingsState = Settings

const initialSettingsState: SettingsState = (JSON.parse(localStorage.getItem('settings')!) as SettingsState) ?? {
    toolbarPosition: 'top',
    autocomplete: true,
    forceAssistantUpdate: false,
    hideDustCounter: false,
    playerNamesPosition: 'default',
    selectionModalOptions: 'minimal'
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

const setSelectionModalOptionsReducer = (state: SettingsState, action: PayloadAction<SelectionModalOptions>) => {
    state.selectionModalOptions = action.payload
    saveSettings(state)
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
    },
})

export const {
    setToolbarPositionReducer: setToolbarPosition,
    setAutocompleteReducer: setAutocomplete,
    setForceAssistantUpdateReducer: setForceAssistantUpdate,
    setHideDustCounterReducer: setHideDustCounter,
    setPlayerNamesPositionReducer: setPlayerNamesPosition,
    setSelectionModalOptionsReducer: setSelectionModalOptions,
} = settingsSlice.actions

export const selectToolbarPosition = (state: SettingsState) => state.toolbarPosition

export const selectAutocomplete = (state: SettingsState) => state.autocomplete

export const selectForceAssistantUpdate = (state: SettingsState) => state.forceAssistantUpdate

export const selectHideDustCounter = (state: SettingsState) => state.hideDustCounter

export const selectPlayerNamesPosition = (state: SettingsState) => state.playerNamesPosition

export const selectSelectionModalOptions = (state: SettingsState) => state.selectionModalOptions

export default settingsSlice.reducer
