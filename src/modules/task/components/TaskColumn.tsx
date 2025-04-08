import React, { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card } from '../common/Card'
import SortableTaskItem from '../common/SortableTaskItem'
import { useKanbanContext } from '../contexts/KanbanContext'
import { getIdOfColumn } from '../utils/kanban'

import { AddCard } from './AddTaskCard'

import { KanbanTaskType } from '@/modules/kanban/types/kanban-task.types'
import { useUpdateTaskColumn } from '@/modules/task/hooks/supplier/mutations/useUpdateTaskColumn'

type ColumnProps = {
    id: string
    items: KanbanTaskType[]
}

export const Column = ({ id, items = [] }: ColumnProps) => {
    const { columns } = useKanbanContext()
    const { setNodeRef } = useDroppable({ id })
    const updateColumnMutation = useUpdateTaskColumn()

    // Trouver la colonne actuelle
    const status = React.useMemo(() => {
        if (!columns) return undefined
        return columns.find((column) => column.id == getIdOfColumn(id)) || undefined
    }, [columns, id])

    // State pour gérer l'édition du titre
    const [isEditing, setIsEditing] = useState(false)
    const [columnTitle, setColumnTitle] = useState(status?.name || '')

    // Gère la validation du nouveau titre
    const handleBlur = () => {
        if (!status || columnTitle.trim() === '' || columnTitle === status.name) {
            setIsEditing(false)
            return
        }

        updateColumnMutation.mutate(
            { columnId: status.id, data: { name: columnTitle } },
            {
                onSuccess: () => {
                    setIsEditing(false)
                }
            }
        )
    }

    return (
        <div className="w-[32rem] h-full flex flex-col gap-8">
            {/* Header de la colonne */}
            <div className="flex justify-between items-center flex-shrink-0">
                {isEditing ? (
                    <input
                        type="text"
                        className="font-semibold text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        value={columnTitle}
                        onChange={(e) => setColumnTitle(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
                        autoFocus
                    />
                ) : (
                    <h2
                        className="font-semibold text-sm cursor-pointer hover:underline w-full"
                        onClick={() => setIsEditing(true)}
                    >
                        {status ? status.name : null} {items.length > 0 ? `(${items.length})` : null}
                    </h2>
                )}

            </div>

            {/* Ajout d'une tâche */}
            <AddCard column={status} />

            {/* Liste des tâches */}
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
