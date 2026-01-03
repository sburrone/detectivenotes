import { CustomModal } from '../components/CustomModal.tsx'
import { Avatar, Grid, useTheme } from '@mui/material'
import SettingsMenuEntry from './SettingsMenuEntry.tsx'
import { PlayerNamesPosition, SelectionModalOption, ToolbarPosition } from '../types.ts'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import {
    DarkMode,
    ShelfAutoHide,
    Stars,
    TextRotationNone,
    Verified,
    WandStars,
} from '@nine-thirty-five/material-symbols-react/sharp'
import { useIntl } from 'react-intl'
import { useGameStore } from '../store/useGameStore.ts'

export interface ISettingsMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
    disableModal?: boolean
}

export const SettingsMenu = ({ open, setOpen, disableModal }: ISettingsMenuProps) => {
    const {
        autocomplete,
        playerNamesPosition,
        toolbarPosition,
        setAutocomplete,
        setPlayerNamesPosition,
        setToolbarPosition,
        colorMode,
        toggleColorMode,
        hideDustCounter,
        setHideDustCounter,
        selectionModalOptions,
        setSelectionModalOptions,
        forceAssistantUpdate,
        setForceAssistantUpdate,
    } = useSettingsStore()

    const { board } = useGameStore()

    const { formatMessage } = useIntl()
    const theme = useTheme()

    return (
        <CustomModal
            open={open}
            setOpen={setOpen}
            title={formatMessage({ id: 'settings' })}
            color={'tertiary'}
            disabled={disableModal}
        >
            <Grid container spacing={2}>
                <SettingsMenuEntry
                    title={formatMessage({ id: 'darkMode' })}
                    description={formatMessage({ id: 'darkMode.description' })}
                    enabled={colorMode === 'dark'}
                    icon={<DarkMode style={{ height: 32, width: 32 }} />}
                    type={'checkbox'}
                    onChange={toggleColorMode}
                />
                <SettingsMenuEntry
                    title={formatMessage({ id: 'autocomplete' })}
                    description={formatMessage({ id: 'autocomplete.description' })}
                    enabled={autocomplete}
                    icon={<Verified style={{ height: 32, width: 32 }} />}
                    type={'checkbox'}
                    onChange={setAutocomplete}
                />
                <SettingsMenuEntry
                    title={formatMessage({ id: 'forceAssistantUpdate' })}
                    description={formatMessage({ id: 'forceAssistantUpdate.description' })}
                    enabled={forceAssistantUpdate}
                    icon={<WandStars style={{ height: 32, width: 32 }} />}
                    type={'checkbox'}
                    onChange={setForceAssistantUpdate}
                />
                {board?.id === 5 && (
                    <SettingsMenuEntry
                        title={formatMessage({ id: 'hideDustCounter' })}
                        description={formatMessage({ id: 'hideDustCounter.description' })}
                        enabled={hideDustCounter}
                        icon={
                            <Avatar color={theme.palette.text.primary} style={{ height: 32, width: 32 }}>
                                12
                            </Avatar>
                        }
                        type={'checkbox'}
                        onChange={setHideDustCounter}
                    />
                )}
                <SettingsMenuEntry
                    title={formatMessage({ id: 'selectionModalOptions' })}
                    description={formatMessage({ id: 'selectionModalOptions.description' })}
                    icon={<Stars style={{ height: 32, width: 32 }} />}
                    onChange={(opt) => setSelectionModalOptions(opt as SelectionModalOption)}
                    type={'toggleButton'}
                    options={Object.values(SelectionModalOption)}
                    value={selectionModalOptions}
                />
                <SettingsMenuEntry
                    title={formatMessage({ id: 'playerNamesPosition' })}
                    description={formatMessage({ id: 'playerNamesPosition.description' })}
                    icon={<TextRotationNone style={{ height: 32, width: 32 }} />}
                    onChange={(opt) => setPlayerNamesPosition(opt as PlayerNamesPosition)}
                    type={'toggleButton'}
                    options={Object.values(PlayerNamesPosition)}
                    value={playerNamesPosition}
                />
                <SettingsMenuEntry
                    title={formatMessage({ id: 'toolbarPosition' })}
                    description={formatMessage({ id: 'toolbarPosition.description' })}
                    icon={<ShelfAutoHide style={{ transform: 'rotate(180deg)', height: 32, width: 32 }} />}
                    onChange={(opt) => setToolbarPosition(opt as ToolbarPosition)}
                    type={'toggleButton'}
                    options={Object.values(ToolbarPosition)}
                    value={toolbarPosition}
                />
            </Grid>
        </CustomModal>
    )
}
