import { FC, ReactElement } from 'react'
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'

interface IUpperBarProps {
    children: ReactElement | ReactElement[]
}

const UpperBar: FC<IUpperBarProps> = (props) => {
    const { children } = props

    const theme = useTheme()

    return (
        <Box
            sx={{
                flexGrow: 1,
            }}
        >
            <AppBar position={'static'} sx={{ backgroundColor: theme.palette.primary.contrastText }}>
                <Toolbar>{children}</Toolbar>
            </AppBar>
        </Box>
    )
}

export default UpperBar
