import { FC, ReactNode } from 'react'
import { AppBar, Box, SxProps, TableContainer, Theme, Toolbar, useTheme } from '@mui/material'

interface IUpperBarProps {
    children: ReactNode
    style?: SxProps<Theme>
}

const UpperBar: FC<IUpperBarProps> = (props) => {
    const { children, style } = props

    const theme = useTheme()

    return (
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: '100dvw',
            }}
        >
            <AppBar
                position={'static'}
                sx={{ maxWidth: '100dvw', backgroundColor: theme.palette.primary.contrastText }}
            >
                <TableContainer sx={{ display: 'flex' }}>
                    <Toolbar sx={{ maxWidth: '100dvw', overflowX: 'auto', ...style }}>{children}</Toolbar>
                </TableContainer>
            </AppBar>
        </Box>
    )
}

export default UpperBar
