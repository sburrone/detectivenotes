import { TableIcon } from '@/components/TableIcon'
import { BoardIcon } from '@/utils/icons'

export default function Home() {
    return (
        <>
            {Object.keys(BoardIcon).map((key) => (
                <TableIcon
                    key={key}
                    enabled={true}
                    icon={key as BoardIcon}
                    number={Math.ceil(Math.random() * 5)}
                />
            ))}
        </>
    )
}
