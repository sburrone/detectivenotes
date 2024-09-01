import { CSSProperties, ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

interface ITextWithIconProps {
    icon: ReactElement
    text: string
    textProps?: CSSProperties
}

const TextWithIcon = ({ icon, text, textProps }: ITextWithIconProps) => (
    <Stack direction={'row'} justifyContent={'center'}>
        {icon}
        <Typography style={{ margin: 'auto 0', ...textProps }}>{text}</Typography>
    </Stack>
)

export default TextWithIcon
