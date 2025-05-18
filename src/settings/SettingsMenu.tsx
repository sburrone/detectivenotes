import { CustomModal } from '../components/CustomModal.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectSettings, setAutocomplete, setPlayerNamesPosition, setToolbarPosition } from '../store/settingsSlice.ts'
import { VerifiedTwoTone } from '@mui/icons-material'
import { Grid } from '@mui/material'
import SettingsMenuEntry from './SettingsMenuEntry.tsx'
import { PlayerNamesPosition, ToolbarPosition } from '../types.ts'

export interface ISettingsMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const SettingsMenu = ({ open, setOpen }: ISettingsMenuProps) => {
    const settings = useSelector(selectSettings)

    const dispatch = useDispatch()

    return (
        <CustomModal open={open} setOpen={setOpen} title={'TBD Settings'} color={'tertiary'}>
            <Grid container spacing={2}>
                <SettingsMenuEntry
                    title={'TBD Autocomplete'}
                    description={'TBD Autocomplete description'}
                    enabled={settings.autocomplete}
                    icon={<VerifiedTwoTone />}
                    type={'checkbox'}
                    onChange={(opt) => dispatch(setAutocomplete(opt))}
                />
                <SettingsMenuEntry
                    description={'TBD Long names compatibility mode description'}
                    icon={<>TBD Icon</>}
                    onChange={(opt) => dispatch(setPlayerNamesPosition(opt as PlayerNamesPosition))}
                    title={'TBD Player names position'}
                    type={'select'}
                    options={Object.values(PlayerNamesPosition)}
                    value={settings.playerNamesPosition}
                />
                <SettingsMenuEntry
                    description={'TBD Toolbar position'}
                    icon={<>TBD Icon</>}
                    onChange={(opt) => dispatch(setToolbarPosition(opt as ToolbarPosition))}
                    title={'TBD Toolbar position'}
                    type={'select'}
                    options={Object.values(ToolbarPosition)}
                    value={settings.toolbarPosition}
                />
            </Grid>
        </CustomModal>
    )
}
