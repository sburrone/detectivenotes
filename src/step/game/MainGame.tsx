import { FC } from 'react'
import { Game, Step } from '../../types.ts'
import UpperBar from '../../components/UpperBar.tsx'
import {
    ArrowBack,
    AutoFixHigh,
    InfoRounded,
    LightMode,
    Lock,
    LockOpen,
    Redo,
    Settings,
    Undo,
} from '@mui/icons-material'
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectLocked, setOrToggleLocked } from '../../store/gameSlice.ts'
import { IconButton } from '../../components/CustomButtons.tsx'
import { MainBoard } from './MainBoard.tsx'

interface IGameProps {
    setStep: (step: Step) => void
    updateGame: (prop: keyof Game, value: any) => void
}

const MainGame: FC<IGameProps> = (props) => {
    const { setStep } = props

    const dispatch = useDispatch()

    const locked = useSelector(selectLocked)

    return (
        <div>
            <UpperBar style={{ margin: 'auto' }}>
                <IconButton className={'normal-margin'} variant={'elevated'} onClick={() => setStep(Step.MAIN)}>
                    <ArrowBack />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <InfoRounded />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <LightMode />
                </IconButton>
                <IconButton
                    className={'normal-margin'}
                    variant={'elevated'}
                    onClick={() => dispatch(setOrToggleLocked())}
                >
                    {locked ? <Lock /> : <LockOpen />}
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <AutoFixHigh />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <Undo />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <Redo />
                </IconButton>
                <IconButton className={'normal-margin'} variant={'elevated'}>
                    <Settings />
                </IconButton>
            </UpperBar>
            <MainBoard />
        </div>
    )
}

export default MainGame
