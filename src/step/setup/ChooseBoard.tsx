import { FC } from 'react'
import { Board } from '../../types.ts'
import BoardElement from '../../components/BoardElement.tsx'
import { useBoards } from '../../useBoards.ts'

interface IChooseBoardProps {
    handleChange: (board: Board) => void
    activeBoard: Board | undefined
    boards?: Board[]
}

const ChooseBoard: FC<IChooseBoardProps> = (props) => {
    const { activeBoard, handleChange, boards = useBoards() } = props

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            {boards.map((board, index) => (
                <BoardElement
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
