import { CustomModal } from '../../components/CustomModal.tsx'
import { MenuItem, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useGameStore } from '../../store/useGameStore.ts'
import { CustomSelect } from '../../components/CustomSelect.tsx'
import { useState } from 'react'
import TextWithIcon from '../../components/TextWithIcon.tsx'
import { Check, House, PersonSearch, Swords } from '@nine-thirty-five/material-symbols-react/sharp'
import { Button } from '../../components/CustomButtons.tsx'
import { BoardIcon, UpdateItemPayload } from '../../types.ts'
import { useSettingsStore } from '../../store/useSettingsStore.ts'

export interface IAssistantMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const AssistantMenu = ({ open, setOpen }: IAssistantMenuProps) => {
    const { players, board, updateItem, gameBoard } = useGameStore()
    const { forceAssistantUpdate } = useSettingsStore()

    const { formatMessage } = useIntl()

    const [whoAsked, setWhoAsked] = useState<string>('')
    const [suspectAsked, setSuspectAsked] = useState<string>('')
    const [weaponAsked, setWeaponAsked] = useState<string>('')
    const [roomAsked, setRoomAsked] = useState<string>('')
    const [whoAnswered, setWhoAnswered] = useState<string>('')

    const handleOpen = (open: boolean) => {
        if (!open) {
            setWeaponAsked('')
            setRoomAsked('')
            setSuspectAsked('')
            setWhoAsked('')
            setWhoAnswered('')
        }
        setOpen(open)
    }

    const assistantUpdate = ({
        whoAsked,
        whoAnswered,
        suspectAsked,
        weaponAsked,
        roomAsked,
    }: {
        whoAsked: string
        whoAnswered: string
        suspectAsked: string
        weaponAsked: string
        roomAsked: string
    }) => {
        if (!players || players.length === 0) return

        let playersToUpdate: string[] = []

        if (whoAsked === '%myself%') {
            if (whoAnswered === '%nobody%') {
                playersToUpdate = [...players]
            } else {
                const answeredIndex = players.indexOf(whoAnswered)
                if (answeredIndex === -1) return
                playersToUpdate = players.slice(0, answeredIndex + 1)
            }
        } else if (whoAnswered === '%myself%') {
            const askedIndex = players.indexOf(whoAsked)
            if (askedIndex === -1) return
            playersToUpdate = players.slice(askedIndex)
        } else {
            const askedIndex = players.indexOf(whoAsked)
            if (askedIndex === -1) return

            if (whoAnswered === '%nobody%') {
                playersToUpdate = players.filter((p) => p !== whoAsked)
            } else {
                const answeredIndex = players.indexOf(whoAnswered)
                if (answeredIndex === -1) return

                const n = players.length
                const result: string[] = []

                let i = (askedIndex + 1) % n

                while (i !== answeredIndex) {
                    result.push(players[i])
                    i = (i + 1) % n

                    if (i === askedIndex) break
                }

                playersToUpdate = result
            }
        }

        const guesses = [suspectAsked, weaponAsked, roomAsked]
        const payload: UpdateItemPayload[] = []

        guesses.map((guess) => {
            const row = gameBoard?.find((row) => row.item === guess)
            if (row?.locked) return

            playersToUpdate.map((player) => {
                const playerIndex = players.indexOf(player)
                const badge = row?.values[playerIndex].badge ?? 0
                const icon = row?.values[playerIndex].icon ?? BoardIcon.RESET
                if (icon === BoardIcon.RESET || forceAssistantUpdate) {
                    payload.push({ item: guess, playerIndex, value: BoardIcon.CROSS, badge, autocomplete: false })
                }
            })

            const whoAnsweredIndex = players.indexOf(whoAnswered)
            if (whoAnsweredIndex !== -1) {
                const badge = row?.values[whoAnsweredIndex].badge ?? 0
                const icon = row?.values[whoAnsweredIndex].icon
                if (icon !== BoardIcon.CROSS && icon !== BoardIcon.CHECK) {
                    const guessedRows = gameBoard?.filter((row) => guesses.includes(row.item))
                    const crossedRows = guessedRows?.filter(
                        (row) => row?.values[whoAnsweredIndex].icon === BoardIcon.CROSS
                    )
                    const onlyOption =
                        crossedRows?.length === (guessedRows?.length ?? 0) - 1 &&
                        !crossedRows?.find((row) => row.item === guess)
                    payload.push({
                        item: guess,
                        playerIndex: whoAnsweredIndex,
                        value: onlyOption ? BoardIcon.CHECK : BoardIcon.MAYBE,
                        badge: onlyOption ? 0 : badge + 1,
                        autocomplete: onlyOption,
                    })
                }
            }
        })

        updateItem(payload)
        handleOpen(false)
    }

    return (
        <CustomModal open={open} setOpen={handleOpen} title={formatMessage({ id: 'assistant' })} color={'tertiary'}>
            <Stack direction={'column'} spacing={4}>
                <Stack direction={'column'} spacing={1}>
                    <Typography color={'primary'} align={'center'} variant={'h5'}>
                        {formatMessage({ id: 'assistant.whoAsked' })}
                    </Typography>
                    <CustomSelect value={whoAsked} onChange={(e) => setWhoAsked(e.target.value as string)}>
                        <MenuItem value={'%myself%'}>{formatMessage({ id: 'myself' })}</MenuItem>
                        {players?.map((value, key) => (
                            <MenuItem value={value} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                    <Typography color={'primary'} align={'center'} variant={'h5'}>
                        {formatMessage({ id: 'assistant.whatAsked' })}
                    </Typography>
                    <TextWithIcon
                        icon={<PersonSearch />}
                        text={formatMessage({ id: 'suspect' })}
                        textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                    />
                    <CustomSelect value={suspectAsked} onChange={(e) => setSuspectAsked(e.target.value as string)}>
                        {board?.characters?.map((value, key) => (
                            <MenuItem value={value} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                    <TextWithIcon
                        icon={<Swords />}
                        text={formatMessage({ id: 'weapon' })}
                        textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                    />
                    <CustomSelect value={weaponAsked} onChange={(e) => setWeaponAsked(e.target.value as string)}>
                        {board?.weapons?.map((value, key) => (
                            <MenuItem value={value} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                    <TextWithIcon
                        icon={<House />}
                        text={formatMessage({ id: 'room' })}
                        textProps={{ fontSize: '1.125rem', marginInlineStart: 4 }}
                    />
                    <CustomSelect value={roomAsked} onChange={(e) => setRoomAsked(e.target.value as string)}>
                        {board?.rooms?.map((value, key) => (
                            <MenuItem value={value} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </CustomSelect>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                    <Typography color={'primary'} align={'center'} variant={'h5'}>
                        {formatMessage({ id: 'assistant.whoAnswered' })}
                    </Typography>
                    <CustomSelect value={whoAnswered} onChange={(e) => setWhoAnswered(e.target.value as string)}>
                        <MenuItem value={'%myself%'}>{formatMessage({ id: 'myself' })}</MenuItem>
                        {players?.map((value, key) => (
                            <MenuItem value={value} key={key}>
                                {value}
                            </MenuItem>
                        ))}
                        <MenuItem value={'%nobody%'}>{formatMessage({ id: 'nobody' })}</MenuItem>
                    </CustomSelect>
                </Stack>
                <Button
                    disabled={
                        !(
                            weaponAsked.length &&
                            suspectAsked.length &&
                            roomAsked.length &&
                            whoAnswered.length &&
                            whoAsked.length
                        )
                    }
                    onClick={() => assistantUpdate({ whoAsked, whoAnswered, suspectAsked, weaponAsked, roomAsked })}
                    startIcon={<Check />}
                >
                    {formatMessage({ id: 'confirm' })}
                </Button>
            </Stack>
        </CustomModal>
    )
}
