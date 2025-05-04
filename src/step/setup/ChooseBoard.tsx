import { FC } from 'react'
import { Board } from '../../types.ts'
import SetupBoardElement from '../../components/SetupBoardElement.tsx'
import { useBoards } from '../../useBoards.ts'

interface IChooseBoardProps {
    handleChange: (board: Board) => void
    activeBoard: Board | undefined
    boards?: Board[]
}

const ChooseBoard: FC<IChooseBoardProps> = (props) => {
    const { activeBoard, handleChange, boards } = props

    const boardHook = useBoards()

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            {(boards || boardHook).map((board, index) => (
                <SetupBoardElement
                    board={board}
                    key={index}
                    style={{ margin: '1em' }}
                    selected={activeBoard?.id === board.id}
                    onClick={() => {
                        handleChange(board)
                    }}
                />
            ))}
        </div>
    )
}

export default ChooseBoard
