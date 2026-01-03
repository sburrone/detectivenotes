import { FC, useEffect } from 'react'
import { BoardIcon, SelectionModalOption } from '../types.ts'
import { Badge } from '@mui/material'
import { getBoardIcon } from '../utils.tsx'
import { IconButton } from './CustomButtons.tsx'
import { useSettingsStore } from '../store/useSettingsStore.ts'
import { useBoardButtonModalStore } from '../store/useBoardButtonModalStore.ts'

export interface IBoardButtonProps {
    icon: BoardIcon
    number: number
    disabled: boolean
    item: string
    player: number
}

const buttonBaseProps = {
    variant: 'text' as const,
    sx: { textAlign: 'center', color: 'inherit', padding: 0 },
}

export const BoardButton: FC<IBoardButtonProps> = (props) => {
    const { icon, number, disabled, item, player } = props

    const { colorMode, selectionModalOptions } = useSettingsStore()
    const { setIcon, setOpen, setNumber, setPlayer, setItem, open, item: editing } = useBoardButtonModalStore()

    const handleClick = () => {
        setItem(item)
        setPlayer(player)
        setIcon(icon)
        setNumber(number)

        setOpen(true)
    }

    useEffect(() => {
        if (open && editing === item) {
            setNumber(number)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    return (
        <>
            <IconButton disabled={disabled} onClick={handleClick} {...buttonBaseProps}>
                <Badge
                    color={'info'}
                    overlap={'circular'}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={selectionModalOptions === SelectionModalOption.full ? number : 0}
                >
                    {getBoardIcon(icon, colorMode)}
                </Badge>
            </IconButton>
        </>
    )
}
