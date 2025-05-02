import Image from 'next/image'
import { ReactElement } from 'react'

export enum BoardIcon {
    YES = 'YES',
    MAYBE = 'MAYBE',
    NO = 'NO',
    MAYBE_NOT = 'MAYBE_NOT',
    QUESTION_MARK = 'QUESTION_MARK',
    EXCLAMATION_MARK = 'EXCLAMATION_MARK',
    FLAG = 'FLAG',
    SKIP = 'SKIP',
    STAR = 'STAR',
    RESET = 'RESET',
}

export const getBoardIcon = (boardIcon: BoardIcon): ReactElement => {
    switch (boardIcon) {
        case BoardIcon.YES:
            return (
                <Image
                    alt={'Yes'}
                    src={'icons/check.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.MAYBE:
            return (
                <Image
                    alt={'Maybe'}
                    src={'icons/check.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.NO:
            return (
                <Image
                    alt={'No'}
                    src={'icons/cross.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.MAYBE_NOT:
            return (
                <Image
                    alt={'Maybe not'}
                    src={'icons/cross.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.QUESTION_MARK:
            return (
                <Image
                    alt={'Question Mark'}
                    src={'icons/question.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.EXCLAMATION_MARK:
            return (
                <Image
                    alt={'Exclamation Mark'}
                    src={'icons/exclamation.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.FLAG:
            return (
                <Image
                    alt={'Flag'}
                    src={'icons/flag.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.SKIP:
            return (
                <Image
                    alt={'Skip'}
                    src={'icons/skip.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.STAR:
            return (
                <Image
                    alt={'Star'}
                    src={'icons/star.svg'}
                    height={40}
                    width={40}
                />
            )
        case BoardIcon.RESET:
        default:
            return (
                <Image
                    alt={'Reset'}
                    src={'icons/reset.svg'}
                    height={40}
                    width={40}
                />
            )
    }
}
