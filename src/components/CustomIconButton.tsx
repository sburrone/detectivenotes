import { IconButton, IconButtonProps } from '@mui/joy'
import { FC } from 'react'

const CustomIconButton: FC<IconButtonProps> = (props) => (
    <IconButton
        variant={'solid'}
        size={'lg'}
        color={'primary'}
        sx={{ margin: '4px' }}
        {...props}
    >
        {props.children}
    </IconButton>
)

export default CustomIconButton
