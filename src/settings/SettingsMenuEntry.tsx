import { Checkbox } from '../components/CustomButtons.tsx'
import { PlayerNamesPosition, SelectionModalOption, ToolbarPosition } from '../types.ts'
import { Grid, ListItem, ListItemIcon, ListItemText, MenuItem, Select, useTheme } from '@mui/material'

interface ISettingsMenuEntryBaseProps {
    title: string
    description: string
    icon: React.ReactNode
}

interface ISettingsMenuEntryCheckboxOwnProps {
    enabled: boolean
    onChange: (checked: boolean) => void
}

interface ISettingsMenuEntrySelectOwnProps {
    value: ToolbarPosition | PlayerNamesPosition | SelectionModalOption
    options: ToolbarPosition[] | PlayerNamesPosition[] | SelectionModalOption[]
    onChange: (option: ToolbarPosition | PlayerNamesPosition | SelectionModalOption) => void
}

interface ISettingsMenuEntryCheckboxProps extends ISettingsMenuEntryBaseProps, ISettingsMenuEntryCheckboxOwnProps {
    type: 'checkbox'
}

interface ISettingsMenuEntrySelectProps extends ISettingsMenuEntryBaseProps, ISettingsMenuEntrySelectOwnProps {
    type: 'select'
}

type ISettingsMenuEntryProps = ISettingsMenuEntryCheckboxProps | ISettingsMenuEntrySelectProps

const CheckboxEntry = ({ enabled, onChange }: ISettingsMenuEntryCheckboxOwnProps) => (
    <Checkbox color={'tertiary'} checked={enabled} onChange={(e) => onChange(e.target.checked)} />
)

const SelectEntry = ({ value, options, onChange }: ISettingsMenuEntrySelectOwnProps) => {
    const theme = useTheme()

    return (
        <Select
            sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme.palette as any).tertiary.main,
                },
            }}
            value={value}
            onChange={(e) => onChange(e.target.value as ToolbarPosition | PlayerNamesPosition | SelectionModalOption)}
        >
            {options.map((value, key) => (
                <MenuItem value={value} key={key}>
                    TBD Translated {value}
                </MenuItem>
            ))}
        </Select>
    )
}

const SettingsMenuEntry = (props: ISettingsMenuEntryProps) => {
    const { title, description, icon, type, ...rest } = props

    const isCheckbox = type === 'checkbox'

    return (
        <Grid container spacing={2} width={'100%'} justifyContent={'space-between'}>
            <Grid size={isCheckbox ? 11 : { lg: 8, md: 12 }}>
                <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ paddingInlineEnd: 12 }}>{icon}</ListItemIcon>
                    <ListItemText
                        slotProps={{ primary: { fontSize: '1.125rem' }, secondary: { fontSize: '0.75rem' } }}
                        primary={title}
                        secondary={description}
                    />
                </ListItem>
            </Grid>
            <Grid
                size={isCheckbox ? 1 : { lg: 4, md: 12 }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
            >
                {isCheckbox ? (
                    <CheckboxEntry {...(rest as ISettingsMenuEntryCheckboxOwnProps)} />
                ) : (
                    <SelectEntry {...(rest as ISettingsMenuEntrySelectOwnProps)} />
                )}
            </Grid>
        </Grid>
    )
}

export default SettingsMenuEntry
