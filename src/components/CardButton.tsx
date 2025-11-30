import { CSSProperties, FC, ReactNode } from 'react'
import { Card, CardActionArea, CardContent, CardHeader, useTheme } from '@mui/material'

interface ICardButtonProps {
    header: ReactNode
    content?: ReactNode
    onClick: () => void
    headerColor?: string
    style?: CSSProperties
}

const CardButton: FC<ICardButtonProps> = (props: ICardButtonProps) => {
    const { header, content, onClick, headerColor, style } = props
    const theme = useTheme()
    return (
        <Card
            sx={{
                padding: 0,
                width: '40em',
                height: 'fit-content',
                maxWidth: 'calc(100dvw - 2rem)',
                ...style,
            }}
            onClick={onClick}
        >
            <CardActionArea>
                <CardHeader
                    title={header}
                    sx={{
                        backgroundColor: headerColor ?? (theme.palette as any).primaryContainer?.main,
                    }}
                />
                {content && <CardContent sx={{ paddingBottom: 16 }}>{content}</CardContent>}
            </CardActionArea>
        </Card>
    )
}

export default CardButton
