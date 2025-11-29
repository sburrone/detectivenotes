import { Select, SelectProps, useTheme } from '@mui/material'
import { FC } from 'react'
import _ from 'lodash'

export const CustomSelect: FC<SelectProps> = (props) => {
    const theme = useTheme()
    return (
        <Select
            {...props}
            sx={_.merge({}, props.sx, {
                '.MuiSelect-icon': {
                    top: props.label ? 10 : 'unset',
                    right: 0,
                    transition: 'transform 0.1s linear',
                    fill: theme.palette.text.primary,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme.palette as any).secondary.main,
                },
                '.MuiOutlinedInput-notchedOutline legend': {
                    height: 'unset',
                },
                '.MuiOutlinedInput-notchedOutline span': {
                    opacity: 1,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme.palette as any).tertiary.main,
                },
            })}
        />
    )
}
