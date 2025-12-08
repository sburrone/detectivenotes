import { CustomModal } from '../../components/CustomModal.tsx'
import { Stack } from '@mui/material'
import { useIntl } from 'react-intl'

export interface ITutorialMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const TutorialMenu = ({ open, setOpen }: ITutorialMenuProps) => {
    const { formatMessage } = useIntl()

    return (
        <CustomModal open={open} setOpen={setOpen} title={formatMessage({ id: 'tutorial' })} color={'tertiary'}>
            <Stack direction={'column'} spacing={4}></Stack>
        </CustomModal>
    )
}
