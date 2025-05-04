import { ButtonProps, IconButton as MUIIconButton, Button as MUIButton, IconButtonProps } from '@mui/material'
import { FC } from 'react'
import { ButtonColor, ButtonVariant } from '../types.ts'

export const Button: FC<Omit<ButtonProps, "variant"|"color"> & { variant?: ButtonVariant; color?: ButtonColor }> = (props) => {
    const { children, ...rest } = props
    return (
        // @ts-ignore
        <MUIButton {...rest}>{children}</MUIButton>
    )
}

export const IconButton: FC<Omit<IconButtonProps, "variant"|"color"> & { variant?: ButtonVariant; color?: ButtonColor }> = (props) => {
    const { children, ...rest } = props
    return (
        // @ts-ignore
        <MUIIconButton {...rest}>{children}</MUIIconButton>
    )
}

export const IconMenuButton: FC<Omit<IconButtonProps, "variant"|"color"> & { variant?: ButtonVariant; color?: ButtonColor }> = (props) => (
    <IconButton variant={'filled'} size={'large'} color={'primary'} sx={{ margin: '4px' }} {...props}>
        {props.children}
    </IconButton>
)
