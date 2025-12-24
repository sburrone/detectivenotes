import { Board } from './types.ts'
import { useIntl } from 'react-intl'
import boardsIT from './strings/boards-it.json'
import boardsEN from './strings/boards-en.json'

export const useBoards = (): Board[] => {
    const { locale } = useIntl()

    return (locale === 'it' ? boardsIT : boardsEN) as Board[]
}
