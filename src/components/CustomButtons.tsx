import { Button as MUIButton, ButtonProps, IconButton as MUIIconButton, IconButtonProps } from '@mui/material'
import { FC } from 'react'
import { ButtonColor, ButtonVariant } from '../types.ts'

export const Button: FC<
    Omit<ButtonProps, 'variant' | 'color'> & {
        variant?: ButtonVariant
        color?: ButtonColor
    }
> = (props) => {
    const { children, ...rest } = props
    return (
        // @ts-expect-error types are wrong
        <MUIButton {...rest}>{children}</MUIButton>
    )
}

export const IconButton: FC<
    Omit<IconButtonProps, 'variant' | 'color'> & {
        variant?: ButtonVariant
        color?: ButtonColor
    }
> = (props) => {
    const { children, ...rest } = props
    return (
        // @ts-expect-error types are wrong
        <MUIIconButton {...rest}>{children}</MUIIconButton>
    )
}

export const IconMenuButton: FC<
    Omit<IconButtonProps, 'variant' | 'color'> & {
        variant?: ButtonVariant
        color?: ButtonColor
    }
> = (props) => (
    <IconButton variant={'filled'} size={'large'} color={'primary'} sx={{ margin: '4px' }} {...props}>
        {props.children}
    </IconButton>
)
