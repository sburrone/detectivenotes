import { useEffect, useState } from 'react'
import { useSettingsStore } from '../store/useSettingsStore.ts'

export const useSplitscreen = () => {
    const verticalSegmentsQuery = window.matchMedia('(vertical-viewport-segments: 2)')
    const horizontalSegmentsQuery = window.matchMedia('(horizontal-viewport-segments: 2)')

    const hasVerticalSegments = verticalSegmentsQuery.matches
    const hasHorizontalSegments = horizontalSegmentsQuery.matches

    const { splitscreenEnabled } = useSettingsStore()

    const getSplitscreenConfiguration = () =>
        splitscreenEnabled
            ? hasVerticalSegments
                ? 'vertical'
                : hasHorizontalSegments
                  ? 'horizontal'
                  : window.innerHeight > window.innerWidth
                    ? 'vertical'
                    : 'horizontal'
            : false

    const [splitscreen, setSplitscreen] = useState<'vertical' | 'horizontal' | false>(getSplitscreenConfiguration())

    useEffect(() => {
        verticalSegmentsQuery.addEventListener('change', (e) => {
            console.log('AAA vertical change', e.matches)
            if (e.matches) {
                setSplitscreen('vertical')
            } else if (!hasHorizontalSegments) {
                setSplitscreen(window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal')
            } else setSplitscreen(false)
        })
        horizontalSegmentsQuery.addEventListener('change', (e) => {
            console.log('AAA horizontal change', e.matches)
            if (e.matches) {
                setSplitscreen('horizontal')
            } else if (!hasHorizontalSegments) {
                setSplitscreen(window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal')
            } else setSplitscreen(false)
        })
    })

    useEffect(() => {
        setSplitscreen(getSplitscreenConfiguration())
    }, [getSplitscreenConfiguration, splitscreenEnabled])

    console.log('AAA splitscreen', { hasVerticalSegments, hasHorizontalSegments, splitscreenEnabled, splitscreen })
    return splitscreen
}
