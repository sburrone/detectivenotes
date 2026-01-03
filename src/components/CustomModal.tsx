import { Close } from '@mui/icons-material'
import { Backdrop, Card, CardContent, CardHeader, Modal, Stack, Typography, useTheme } from '@mui/material'
import { IconButton } from './CustomButtons.tsx'

export interface ICustomModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    color: 'primary' | 'secondary' | 'tertiary'
    title: string
    children: React.ReactNode
    disabled?: boolean
}

export const CustomModal = ({ open, setOpen, color, title, children, disabled }: ICustomModalProps) => {
    const theme = useTheme()

    const content = (
        <>
            <CardHeader
                title={
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography sx={{ fontSize: '1.25rem', marginInlineStart: 10 }}>{title}</Typography>
                        <IconButton
                            variant={'text'}
                            sx={{ padding: '0 !important', color: 'inherit' }}
                            onClick={() => setOpen(false)}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                }
                sx={{
                    backgroundColor: (theme.palette as any)[`${color}Container`].main,
                }}
                onClick={() => setOpen(false)}
            />
            <CardContent
                sx={{
                    paddingBottom: 16,
                    overflow: 'auto',
                    maxHeight: 'calc(100dvh - 102px)',
                }}
            >
                {children}
            </CardContent>
        </>
    )

    return disabled ? (
        open ? (
            <Card sx={{ padding: 0, borderRadius: 0 }}>{content}</Card>
        ) : undefined
    ) : (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Card
                sx={{
                    padding: 0,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40em',
                    maxWidth: 'calc(100dvw - 30px)',
                    maxHeight: 'calc(100dvh - 30px)',
                    height: 'fit-content',
                }}
            >
                {content}
            </Card>
        </Modal>
    )
}
