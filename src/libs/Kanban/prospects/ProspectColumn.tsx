import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Tag } from '../../Tag'
import { Card } from '../common/Card'
import SortableTaskItem from '../common/SortableTaskItem'
import { useKanbanContext } from '../contexts/KanbanContext'
import { getIdOfColumn } from '../utils/kanban'

import { AddProspectCard } from './AddProspectCard'

import { KanbanTaskType } from '@/modules/kanban/types/kanban-task.types'
import { formatCurrency } from '@/utils/helperPricing'

type ProspectColumn = {
    id: string
    items: KanbanTaskType[]
}

export const Column = ({ id, items = [] }: ProspectColumn) => {
    const { columns } = useKanbanContext()
    const { setNodeRef } = useDroppable({ id })

    const status = React.useMemo(() => {
        if (!columns) return undefined
        return columns.find((column) => column.id == getIdOfColumn(id)) || undefined
    }, [columns, id])


    const totalAmount = React.useMemo(() => items.reduce((current, item) => current + (item?.sum ?? 0), 0), [items])

    return (
        <div className="w-[32rem] h-full flex flex-col gap-8">
            <div className="flex justify-between items-center flex-shrink-0">
                <h2 className="font-semibold text-sm">
                    {status ? status.name : null} {items && items.length > 0 ? `(${items?.length})` : null}
                </h2>
                <Tag size={'xs'} intent={'pending'}>
                    {formatCurrency(totalAmount)}
                </Tag>
            </div>

            <AddProspectCard column={status} />

            <div className="flex-grow-0 h-full overflow-y-auto">
                <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
                    <div ref={setNodeRef}>
                        {items.map((item) => (
                            <div key={item.id}>
                                <SortableTaskItem id={item.id}>
                                    <Card item={item} />
                                </SortableTaskItem>
                            </div>
                        ))}
                    </div>
                </SortableContext>
            </div>
        </div>
    )
}
