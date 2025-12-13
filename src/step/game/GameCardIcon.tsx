import { FC, ReactNode } from 'react'
import { Box, useTheme } from '@mui/material'

export interface IGameCardIconProps {
    children: ReactNode
}

export const GameCardIcon: FC<IGameCardIconProps> = ({ children }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                height: 64,
                width: 48,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${theme.palette.text.primary}`,
                borderRadius: 12,
            }}
        >
            {children}
        </Box>
    )
}
