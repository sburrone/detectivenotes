import { useEffect, useState } from 'react'

// The beforeinstallprompt event is not yet part of the standard TS lib types
type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const detectStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    // iOS Safari
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true

export const usePwaInstall = () => {
    const [installed, setInstalled] = useState(detectStandalone)
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault() // Suppress the browser's automatic install prompt
            setInstallPrompt(e as BeforeInstallPromptEvent)
        }
        const handleAppInstalled = () => {
            setInstalled(true)
            setInstallPrompt(null)
        }
        const standaloneQuery = window.matchMedia('(display-mode: standalone)')
        const handleDisplayModeChange = (e: MediaQueryListEvent) => setInstalled(e.matches)

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)
        standaloneQuery.addEventListener('change', handleDisplayModeChange)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
            standaloneQuery.removeEventListener('change', handleDisplayModeChange)
        }
    }, [])

    const promptInstall = () => {
        if (installPrompt) void installPrompt.prompt()
    }

    return { canInstall: !installed, canPrompt: !!installPrompt, promptInstall }
}
