import { Checkbox } from '../components/CustomButtons.tsx'
import { PlayerNamesPosition, SelectionModalOption, ToolbarPosition } from '../types.ts'
import { Grid, MenuItem, Select, Typography, useTheme } from '@mui/material'

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
        <Grid container spacing={2} width={'100%'}>
            <Grid size={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {icon}
            </Grid>
            <Grid
                size={isCheckbox ? 10 : { lg: 7, md: 11 }}
                sx={{ flexDirection: 'column' }}
                display={'flex'}
                justifyContent={'center'}
            >
                <Typography sx={{ fontSize: '1.25rem' }}>{title}</Typography>
                <Typography sx={{ fontSize: '0.75rem' }}>{description}</Typography>
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
