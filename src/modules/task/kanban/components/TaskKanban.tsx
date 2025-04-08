import React, { useEffect, useState } from 'react'
import { closestCorners, defaultDropAnimation, DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useUpdateMultipleTasks } from '@task/hooks/mutations/useUpdateMultipleTasks'
import { useReadColumns } from '@task/hooks/queries'
import { useKanbanDragAndDrop } from '@task/hooks/useKanbanDragAndDrop'
import { KanbanTaskType } from '@task/types/kanban-task.types'

import { Card } from '@task/kanban/components/Card'

import { KanbanCardListType, KanbanContext } from '../../contexts/KanbanContext'
import { findBoardSectionContainer, getIdOfColumn, initialize } from '../../utils/kanban'

import { FormUpdateTask } from './FormUpdateTask'
import { Column } from './TaskColumn'

export const TaskKanban = () => {
    const queryKanban = useReadColumns(1)

    const parseTaskData = (rawData: any) => {
        const columns = rawData.data ?? []

        return {
            item: {
                id: 1,
                name: 'Tasks Board',
                slug: 'tasks',
                created_at: null,
                updated_at: null,

                tasks: columns.flatMap((column: any) =>
                    column.items.map((task: any) => ({
                        id: task.id,
                        kanban_id: 1,
                        category_id: column.id,
                        title: task.name,
                        content: task.description ?? null,
                        sum: null,
                        created_at: task.created_at,
                        updated_at: task.updated_at,
                        order: task.order,
                        status: task.status,
                        priority: task.priority
                    }))
                ),

                categories: columns.map((column: any) => ({
                    id: column.id,
                    kanban_id: 1,
                    name: column.name,
                    created_at: column.created_at,
                    updated_at: column.updated_at,
                    order: column.order
                }))
            }
        }
    }

    const [formattedData, setFormattedData] = useState<any>(null)

    useEffect(() => {
        if (queryKanban.isSuccess && queryKanban.data) {
            setFormattedData(parseTaskData(queryKanban.data))
        }
    }, [queryKanban.data, queryKanban.isSuccess])

    const [taskOpen, setTaskOpen] = useState<KanbanTaskType | null>(null)

    const updateKanbanTask = useUpdateMultipleTasks()

    const [itemsByColumns, setItemsByColumns] = useState<KanbanCardListType>({})

    useEffect(() => {
        if (!formattedData) {
            return
        }

        const dataSortByColumns = initialize(formattedData.item.tasks, formattedData.item.categories)
        setItemsByColumns(dataSortByColumns)
    }, [formattedData])

    const { activeTaskId, sensors, handleDragStart, handleDragOver } = useKanbanDragAndDrop(itemsByColumns, setItemsByColumns)

    const updateMultipleTasks = (tasks: { id: number; order: number }[]) => {
        updateKanbanTask.mutate(tasks)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const active = event.active
        const over = event.over

        if (!over) {
            return
        }

        const activeId = active.id as string
        const overId = over.id as string

        const activeContainer = findBoardSectionContainer(itemsByColumns, activeId)
        const overContainer = findBoardSectionContainer(itemsByColumns, overId)

        if (!activeContainer || !overContainer) {
            return
        }

        const activeIndex = itemsByColumns[activeContainer].findIndex((task) => task.id === active.id)
        const overIndex = itemsByColumns[overContainer].findIndex((task) => task.id === over.id)

        if (activeContainer !== overContainer) {
            console.log(`Déplacement entre colonnes (${activeContainer} → ${overContainer})`)
        } else {
            const newBoard = {
                ...itemsByColumns,
                [overContainer]: arrayMove(itemsByColumns[overContainer], activeIndex, overIndex)
            }

            setItemsByColumns(newBoard)

            const updatedTasks = newBoard[overContainer].map((task, index) => ({
                ...task,
                order: index,
                category_id: getIdOfColumn(overContainer)
            }))

            updateMultipleTasks(updatedTasks)
        }
    }

    const cardItem = activeTaskId ? formattedData?.item.tasks.find((task: KanbanTaskType) => task.id === activeTaskId) : null
    if (!formattedData) {
        return
    }
    return (
        <KanbanContext.Provider
            value={{
                columns: formattedData.item.categories,
                data: formattedData.item.tasks,
                taskOpen,
                setTaskOpen,
            }}
        >
            <div className="h-full">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <ul className="flex gap-8 h-full overflow-y-hidden">
                        {Object.keys(itemsByColumns).map((key) => (
                            <li key={key}>
                                <Column id={key} items={itemsByColumns[key]} />
                            </li>
                        ))}
                        <DragOverlay dropAnimation={defaultDropAnimation}>
                            {cardItem ? <Card item={cardItem} /> : null}
                        </DragOverlay>
                    </ul>
                </DndContext>
                <FormUpdateTask />
            </div>
        </KanbanContext.Provider>
    )
}
