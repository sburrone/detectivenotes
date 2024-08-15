import { FC } from 'react'
import { Button, IconButton, Stack, Typography } from '@mui/joy'
import {
    AddToHomeScreen,
    DarkMode,
    Info,
    Language,
    PlayArrow,
} from '@mui/icons-material'
import CustomIconButton from '../../components/CustomIconButton.tsx'
import { Step } from '../../types.ts'

const MainMenuButtons: FC<{
    setStep: (step: Step) => any
    hideUI: boolean
    setHideUI: (hideUI: boolean) => any
}> = ({ setStep, hideUI, setHideUI }) => {
    return (
        <>
            {!hideUI && (
                <Stack
                    style={{
                        position: 'fixed',
                        top: 0,
                        height: '100vh',
                        width: '100vw',
                    }}
                    onDoubleClick={(e: Event) => {
                        e.preventDefault()
                        setHideUI(true)
                        console.log('set', hideUI)
                    }}
                >
                    <>
                        <span
                            style={{
                                fontFamily: 'Dela Gothic One',
                                fontSize: '8em',
                                maxWidth: '800px',
                                margin: '24px auto',
                                textAlign: 'center',
                            }}
                        >
                            detective notes
                        </span>
                        <Button startDecorator={<PlayArrow />}>New</Button>
                        <div
                            style={{
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                margin: 16,
                            }}
                        >
                            <CustomIconButton onClick={() => setHideUI(true)}>
                                <Language />
                            </CustomIconButton>
                            <CustomIconButton>
                                <AddToHomeScreen />
                            </CustomIconButton>
                            <CustomIconButton>
                                <DarkMode /> {/*TODO light mode*/}
                            </CustomIconButton>
                            <CustomIconButton>
                                <Info />
                            </CustomIconButton>
                        </div>
                    </>
                </Stack>
            )}
        </>
    )
}

export default MainMenuButtons
