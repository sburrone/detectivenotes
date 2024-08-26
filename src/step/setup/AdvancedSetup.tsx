import { FC } from 'react'
import { Board } from '../../types.ts'
import { Typography } from '@mui/material'

interface IAdvancedSetupProps {
    players: string[]
    board: Board
}

const AdvancedSetup: FC<IAdvancedSetupProps> = (props) => {
    const { players, board } = props

    const numCards = board.characters.length + board.weapons.length + board.rooms.length
    const numPlayers = players.length
    const numEach = Math.floor(numCards / numPlayers)
    const numLeftover = numCards & numPlayers

    return (
        <>
            <Typography color={'primary'} align={'center'} variant={'h5'}>
                TBD Advanced Setup
            </Typography>
            <Typography color={'secondary'} align={'center'}>
                TBD You can skip this, but you will lose access to the advanced player info panel.
            </Typography>

            <Typography color={'primary'} align={'center'} variant={'h6'}>
                TBD There are {numCards} total cards. With {numPlayers} players, everyone will receive {numEach} cards.
                What should we do with the remaining {numLeftover} cards?
            </Typography>
        </>
    )
}

export default AdvancedSetup
