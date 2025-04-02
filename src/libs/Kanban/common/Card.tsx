import { useState } from 'react'

import { useKanbanContext } from '../contexts/KanbanContext'

import { Icon } from '@/components/Icon'
import { KanbanTaskType } from '@/modules/kanban/types/kanban-task.types'
import { formatCurrency } from '@/utils/helperPricing'

type Props = {
    item: KanbanTaskType
}

export const Card = ({ item }: Props) => {
    const { setTaskOpen } = useKanbanContext()
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)

    const handleMouseDown = () => {
        setClickTimer(setTimeout(() => {
            setClickTimer(null)
        }, 200))
    }

    const handleMouseUp = () => {
        if (clickTimer) {
            clearTimeout(clickTimer)
            setClickTimer(null)
            setTaskOpen(item)
        }
    }

    return (
        <div
            className="relative rounded bg-white border border-grey-200 p-6 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="flex justify-between gap-4">
                <p className="font-medium text-xs">{item.title}</p>
                <button onClick={() => setTaskOpen(item)}>
                    <Icon name="edit" className="size-6 fill-grey-600 transition-all hover:fill-primary" />
                </button>
            </div>
            {item.sum ? <div className="font-medium text-grey-600 text-xs">{formatCurrency(item.sum)}</div> : null}
            {item.content && <div className="text-sm text-grey-600 mt-4">{item.content}</div>}
        </div>
    )
}
