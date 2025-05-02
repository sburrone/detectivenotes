import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { MailOpen } from 'lucide-react'
import { BoardIcon, getBoardIcon } from '@/utils/icons'

export interface ITableIconProps {
    icon: BoardIcon
    number: number
    enabled: boolean
}

export const TableIcon: FC<ITableIconProps> = (props) => {
    const { icon, number, enabled } = props

    return (
        <Button variant={'ghost'}>
            <span>
                {getBoardIcon(icon)}
                <span style={{ width: 0, zIndex: 10 }}>
                    {number === 0 ? undefined : number}
                </span>
            </span>
        </Button>
    )
}
