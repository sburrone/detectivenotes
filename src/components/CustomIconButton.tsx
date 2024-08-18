import { IconButton, IconButtonProps } from '@mui/material'
import { FC } from 'react'

const CustomIconButton: FC<IconButtonProps> = (props) => (
    <IconButton
        variant={'filled'}
        size={'lg'}
        color={'primary'}
        sx={{ margin: '4px' }}
        {...props}
    >
        {props.children}
    </IconButton>
)

export default CustomIconButton
