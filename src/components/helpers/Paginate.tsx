import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { debounce } from '@digico/utils'

import { PaginateType } from 'types/paginate'

import { Icon } from '@components/Icon'

type Props = {
    className?: string
    paginate?: PaginateType
}

export const Paginate = ({ paginate, className }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [pages, setPages] = useState<(number | string)[]>([])

    const currentPage = parseInt(searchParams.get('page') || '1', 10)

    useEffect(() => {
        if (!paginate) return

        const generatePages = (currentPage: number, totalPages: number) => {
            const delta = 2
            const range = []
            const rangeWithDots = []
            let l

            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                    range.push(i)
                }
            }

            for (const i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1)
                    } else if (i - l > 2) {
                        rangeWithDots.push('...')
                    }
                }
                rangeWithDots.push(i)
                l = i
            }

            return rangeWithDots
        }

        const newPages = generatePages(currentPage, paginate.last_page)

        setPages(newPages)
    }, [currentPage, paginate])

    if (!paginate || paginate.last_page === 1) {
        return null
    }

    const handlePrev = async () => {
        const params = new URLSearchParams(searchParams)
        params.set('page', String(currentPage - 1))
        router.push(`?${params.toString()}`)
    }

    const handleNext = async () => {
        const params = new URLSearchParams(searchParams)
        params.set('page', String(currentPage + 1))
        router.push(`?${params.toString()}`)
    }

    const moveToPage = (page: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', String(page))
        router.push(`?${params.toString()}`)
    }

    const handlePage = debounce((event: any) => {
        const page = parseInt(event.target.value)

        if (page > paginate.last_page || page < 1) {
            return null
        }

        moveToPage(page)
    }, 400)

    return (
        <div className="flex justify-end">
            <div className={`bg-white border border-grey-400 flex text-xs text-grey-800 font-medium h-14 rounded-sm ${className}`}>
                <button
                    disabled={currentPage <= 1}
                    onClick={handlePrev}
                    className={`group disabled:opacity-40 aspect-square flex items-center justify-center ${currentPage <= 1 ? 'pointer-events-none' : ''}`}>
                    <Icon className="rotate-90 size-5 fill-grey-600 transition-all group-hover:fill-main" name="arrow" />
                </button>

                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <input
                                onInput={handlePage}
                                key={`${index}_${page}`}
                                className="outline-none w-12 border-l border-l-grey-400 text-center"
                                placeholder="..."
                            />
                        )
                    }

                    return (
                        <button
                            onClick={() => moveToPage(page)}
                            className={`transition-all hover:bg-primary/20 aspect-square border-l border-l-grey-400 hover:text-main ${currentPage === page ? 'bg-primary/20 text-main' : ''}`}
                            key={page}>
                            {page}
                        </button>
                    )
                })}

                <button
                    disabled={currentPage >= paginate.last_page}
                    className="disabled:opacity-40 aspect-square flex items-center justify-center border-l border-l-grey-400 group"
                    onClick={handleNext}>
                    <Icon className="-rotate-90 size-5 fill-grey-600 transition-all group-hover:fill-main" name="arrow" />
                </button>
            </div>
        </div>
    )
}
