import { FC } from 'react'
import { CustomModal } from '../../components/CustomModal'
import { useIntl } from 'react-intl'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { version } from '../../../package.json'

const AboutMenu: FC<{ open: boolean; setOpen: (open: boolean) => void }> = (props) => {
    const { open, setOpen } = props

    const { formatMessage } = useIntl()
    const theme = useTheme()

    return (
        <CustomModal open={open} setOpen={() => setOpen(false)} color={'primary'} title={'Detective Notes'}>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} gap={4}>
                <Box
                    sx={{ width: 200, height: 200, backgroundImage: 'url(icon_x512.png)', backgroundSize: 'contain' }}
                />
                <Typography align={'center'}>{formatMessage({ id: 'credits.version' }, { version })}</Typography>
                <Typography align={'center'}>{formatMessage({ id: 'credits.madeWith' })}</Typography>
                <Typography align={'center'} sx={{ '& a': { color: theme.palette.text.primary } }}>
                    {formatMessage(
                        { id: 'credits.license' },
                        {
                            model: (
                                <a
                                    href="https://sketchfab.com/3d-models/clue-board-game-843af04381cc495ca5f0a4bebadb1752"
                                    target="_blank"
                                >
                                    "Clue (Board Game)"
                                </a>
                            ),
                            author: (
                                <a href="https://sketchfab.com/paulyanez" target="_blank">
                                    Anthony Yanez
                                </a>
                            ),
                            license: (
                                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
                                    CC-BY-4.0
                                </a>
                            ),
                        }
                    )}
                </Typography>
            </Stack>
        </CustomModal>
    )
}

export default AboutMenu
