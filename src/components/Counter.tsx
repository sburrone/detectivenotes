import * as React from 'react'
import { FC, KeyboardEventHandler, useEffect, useState } from 'react'
import { ButtonGroup, Stack, TextField } from '@mui/material'
import { Button } from './CustomButtons.tsx'
import { Add, Remove } from '@mui/icons-material'

export interface ICounterProps {
    value: number
    onChange: (num: number) => void
}

const MAX = 99

export const Counter: FC<ICounterProps> = (props) => {
    const { value, onChange } = props

    const [inputValue, setInputValue] = useState(value)

    const handleClick = (val: number) => {
        onChange(val)
        setInputValue(val)
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const val = Number(event.target.value)
        if (!isNaN(val)) {
            setInputValue(Number(event.target.value))
        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            onChange(inputValue)
        }
    }

    return (
        <Stack direction={'row'} spacing={4} margin={'auto'}>
            {/*{inputValue !== value && (*/}
            {/*    <IconButton variant={'tonal'} onClick={() => setInputValue(value)}>*/}
            {/*        <Replay />*/}
            {/*    </IconButton>*/}
            {/*)}*/}
            <ButtonGroup sx={{ margin: 'auto' }}>
                <Button
                    variant={'elevated'}
                    size={'small'}
                    onClick={() => handleClick(Math.max(inputValue - 1, 0))}
                    disabled={!inputValue}
                >
                    <Remove />
                </Button>
                <TextField
                    variant={'outlined'}
                    onChange={handleInputChange}
                    value={inputValue ?? 0}
                    onKeyDown={handleKeyDown}
                    slotProps={{ htmlInput: { style: { textAlign: 'center' } } }}
                />
                <Button
                    variant={'elevated'}
                    size={'small'}
                    onClick={() => handleClick(Math.min((inputValue ?? 0) + 1, MAX))}
                    disabled={inputValue >= MAX}
                >
                    <Add />
                </Button>
            </ButtonGroup>
            {/*{inputValue !== value && (*/}
            {/*    <IconButton variant={'tonal'} onClick={() => onChange(inputValue)} disabled={inputValue > MAX}>*/}
            {/*        <Check />*/}
            {/*    </IconButton>*/}
            {/*)}*/}
        </Stack>
    )
}
