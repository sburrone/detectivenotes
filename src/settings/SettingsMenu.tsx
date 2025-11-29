import { CustomModal } from '../components/CustomModal.tsx'
import { Grid } from '@mui/material'
import SettingsMenuEntry from './SettingsMenuEntry.tsx'
import { PlayerNamesPosition, ToolbarPosition } from '../types.ts'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import { DarkMode, ShelfAutoHide, TextRotationNone, Verified } from '@nine-thirty-five/material-symbols-react/sharp'
import { useIntl } from 'react-intl'

export interface ISettingsMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const SettingsMenu = ({ open, setOpen }: ISettingsMenuProps) => {
    const {
        autocomplete,
        playerNamesPosition,
        toolbarPosition,
        setAutocomplete,
        setPlayerNamesPosition,
        setToolbarPosition,
        colorMode,
        toggleColorMode,
    } = useSettingsStore()

    const { formatMessage } = useIntl()

    return (
        <CustomModal open={open} setOpen={setOpen} title={formatMessage({ id: 'settings' })} color={'tertiary'}>
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
                    title={formatMessage({ id: 'playerNamesPosition' })}
                    description={formatMessage({ id: 'playerNamesPosition.description' })}
                    icon={<TextRotationNone style={{ height: 32, width: 32 }} />}
                    onChange={(opt) => setPlayerNamesPosition(opt as PlayerNamesPosition)}
                    type={'select'}
                    options={Object.values(PlayerNamesPosition)}
                    value={playerNamesPosition}
                />
                <SettingsMenuEntry
                    title={formatMessage({ id: 'toolbarPosition' })}
                    description={formatMessage({ id: 'toolbarPosition.description' })}
                    icon={<ShelfAutoHide style={{ transform: 'rotate(180deg)', height: 32, width: 32 }} />}
                    onChange={(opt) => setToolbarPosition(opt as ToolbarPosition)}
                    type={'select'}
                    options={Object.values(ToolbarPosition)}
                    value={toolbarPosition}
                />
            </Grid>
        </CustomModal>
    )
}
