import { CustomModal } from '../components/CustomModal.tsx'

export interface ISettingsMenuProps {
    open: boolean
    setOpen: (open: boolean) => void
}

interface ISettingsMenuEntryProps {
    title: string
    description: string
    enabled: boolean
    icon: React.ReactNode
}

const SettingsMenuEntry = ({ title, description, enabled, icon }: ISettingsMenuEntryProps) => (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '1em' }}>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '1em' }}>
            <div style={{ fontSize: '1.25rem' }}>{title}</div>
            <div style={{ fontSize: '0.75rem' }}>{description}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '1em' }}>{icon}</div>
    </div>
)

export const SettingsMenu = ({ open, setOpen }: ISettingsMenuProps) => {
    return (
        <CustomModal open={open} setOpen={setOpen} title={'TBD Settings'} color={'tertiary'}>
            <>Settings menu here</>
        </CustomModal>
    )
}