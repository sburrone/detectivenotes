import { CustomModal } from '../components/CustomModal.tsx'
import { TextRotationNoneTwoTone, VerifiedTwoTone } from '@mui/icons-material'
import { Grid } from '@mui/material'
import SettingsMenuEntry from './SettingsMenuEntry.tsx'
import { PlayerNamesPosition, ToolbarPosition } from '../types.ts'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import { ShelfAutoHide } from '@nine-thirty-five/material-symbols-react/sharp'

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
    } = useSettingsStore()

    return (
        <CustomModal open={open} setOpen={setOpen} title={'TBD Settings'} color={'tertiary'}>
            <Grid container spacing={2}>
                <SettingsMenuEntry
                    title={'TBD Autocomplete'}
                    description={'TBD Autocomplete description'}
                    enabled={autocomplete}
                    icon={<VerifiedTwoTone style={{ height: 32, width: 32 }} />}
                    type={'checkbox'}
                    onChange={(opt) => setAutocomplete(opt)}
                />
                <SettingsMenuEntry
                    description={'TBD Long names compatibility mode description'}
                    icon={<TextRotationNoneTwoTone style={{ height: 32, width: 32 }} />}
                    onChange={(opt) => setPlayerNamesPosition(opt as PlayerNamesPosition)}
                    title={'TBD Player names position'}
                    type={'select'}
                    options={Object.values(PlayerNamesPosition)}
                    value={playerNamesPosition}
                />
                <SettingsMenuEntry
                    description={'TBD Toolbar position'}
                    icon={<ShelfAutoHide style={{ transform: 'rotate(180deg)', height: 32, width: 32 }} />}
                    onChange={(opt) => setToolbarPosition(opt as ToolbarPosition)}
                    title={'TBD Toolbar position'}
                    type={'select'}
                    options={Object.values(ToolbarPosition)}
                    value={toolbarPosition}
                />
            </Grid>
        </CustomModal>
    )
}
