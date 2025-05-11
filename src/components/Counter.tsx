import * as React from 'react'
import { FC, KeyboardEventHandler, useState } from 'react'
import { ButtonGroup, Stack, TextField } from '@mui/material'
import { Button, IconButton } from './CustomButtons.tsx'
import { Add, Check, Remove, Replay } from '@mui/icons-material'

export interface ICounterProps {
    value: number
    onChange: (num: number) => void
}

const MAX = 99

export const Counter: FC<ICounterProps> = (props) => {
    const { value, onChange } = props

    const [count, setCount] = useState(value)

    const handleClick = (val: number) => {
        setCount(val)
        onChange(val)
    }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const val = Number(event.target.value)
        if (!isNaN(val)) {
            setCount(Number(event.target.value))
        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            onChange(count)
        }
    }

    return (
        <Stack direction={'row'} spacing={4} margin={'auto'}>
            {count !== value && (
                <IconButton variant={'tonal'} onClick={() => setCount(value)}>
                    <Replay />
                </IconButton>
            )}
            <ButtonGroup sx={{ margin: 'auto' }}>
                <Button
                    variant={'elevated'}
                    size={'small'}
                    onClick={() => handleClick(Math.max(count - 1, 0))}
                    disabled={!count}
                >
                    <Remove />
                </Button>
                <TextField
                    variant={'outlined'}
                    onChange={handleInputChange}
                    value={count ?? 0}
                    onKeyDown={handleKeyDown}
                    slotProps={{ htmlInput: { style: { textAlign: 'center' } } }}
                />
                <Button
                    variant={'elevated'}
                    size={'small'}
                    onClick={() => handleClick(Math.min((count ?? 0) + 1, MAX))}
                    disabled={count >= MAX}
                >
                    <Add />
                </Button>
            </ButtonGroup>
            {count !== value && (
                <IconButton variant={'tonal'} onClick={() => onChange(count)} disabled={count > MAX}>
                    <Check />
                </IconButton>
            )}
        </Stack>
    )
}
