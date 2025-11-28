import {
    Button as MUIButton,
    ButtonProps,
    Checkbox as MUICheckbox,
    CheckboxProps,
    IconButton as MUIIconButton,
    IconButtonProps,
} from '@mui/material'
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
        <MUIIconButton sx={{ ...rest.sx, fontSize: '1rem' }} {...rest}>
            {children}
        </MUIIconButton>
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

export const Checkbox: FC<
    Omit<CheckboxProps, 'variant' | 'color'> & {
        variant?: ButtonVariant
        color?: ButtonColor
    }
> = (props) => {
    return (
        // @ts-expect-error types are wrong
        <MUICheckbox {...props} />
    )
}
