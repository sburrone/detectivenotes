import { Checkbox } from '../components/CustomButtons.tsx'
import { PlayerNamesPosition, SelectionModalOption, ToolbarPosition } from '../types.ts'
import { Grid, ListItem, ListItemIcon, ListItemText, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useIntl } from 'react-intl'
import { CustomSelect } from '../components/CustomSelect.tsx'

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
    type: 'select' | 'toggleButton'
}

type ISettingsMenuEntryProps = ISettingsMenuEntryCheckboxProps | ISettingsMenuEntrySelectProps

const CheckboxEntry = ({ enabled, onChange }: ISettingsMenuEntryCheckboxOwnProps) => (
    <Checkbox color={'tertiary'} checked={enabled} onChange={(e) => onChange(e.target.checked)} />
)

const SelectEntry = ({ value, options, onChange }: ISettingsMenuEntrySelectOwnProps) => {
    const { formatMessage } = useIntl()

    return (
        <CustomSelect
            value={value}
            onChange={(e) => onChange(e.target.value as ToolbarPosition | PlayerNamesPosition | SelectionModalOption)}
        >
            {options.map((value, key) => (
                <MenuItem value={value} key={key}>
                    {formatMessage({ id: `option.${value}` })}
                </MenuItem>
            ))}
        </CustomSelect>
    )
}

const ToggleButtonEntry = ({ value, options, onChange }: ISettingsMenuEntrySelectOwnProps) => {
    const { formatMessage } = useIntl()

    return (
        <ToggleButtonGroup
            exclusive
            onChange={(_, value) => onChange(value as ToolbarPosition | PlayerNamesPosition | SelectionModalOption)}
            value={value}
            sx={{
                paddingInlineStart: 44,
                '& .MuiToggleButtonGroup-firstButton': { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                '& .MuiToggleButtonGroup-lastButton': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                '& .MuiToggleButtonGroup-middleButton': { borderRadius: 0 },
            }}
        >
            {options.map((value, key) => (
                <ToggleButton value={value} key={key}>
                    {formatMessage({ id: `option.${value}` })}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}

const SettingsMenuEntry = (props: ISettingsMenuEntryProps) => {
    const { title, description, icon, type, ...rest } = props

    const sizes: { title?: number | { lg: number; md: number }; option?: number | { lg: number; md: number } } = {}

    switch (type) {
        case 'checkbox':
            sizes.title = 11
            sizes.option = 1
            break
        case 'select':
            sizes.title = { lg: 8, md: 12 }
            sizes.option = { lg: 4, md: 12 }
            break
        case 'toggleButton':
            sizes.title = 12
            sizes.option = 12
            break
    }

    return (
        <Grid container width={'100%'} justifyContent={'space-between'}>
            <Grid size={sizes.title}>
                <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ paddingInlineEnd: 12 }}>{icon}</ListItemIcon>
                    <ListItemText
                        sx={{ paddingInlineEnd: 8 }}
                        slotProps={{ primary: { fontSize: '1.125rem' }, secondary: { fontSize: '0.75rem' } }}
                        primary={title}
                        secondary={description}
                    />
                </ListItem>
            </Grid>
            <Grid
                size={sizes.option}
                display={'flex'}
                alignItems={'center'}
                justifyContent={type === 'toggleButton' ? undefined : 'end'}
            >
                {type === 'checkbox' && <CheckboxEntry {...(rest as ISettingsMenuEntryCheckboxOwnProps)} />}
                {type === 'select' && <SelectEntry {...(rest as ISettingsMenuEntrySelectOwnProps)} />}
                {type === 'toggleButton' && <ToggleButtonEntry {...(rest as ISettingsMenuEntrySelectOwnProps)} />}
            </Grid>
        </Grid>
    )
}

export default SettingsMenuEntry
