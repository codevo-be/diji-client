import { useParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { closestCorners, defaultDropAnimation, DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { KanbanCardListType, KanbanContext } from '@task/kanban/contexts/KanbanContext'

import { useReadTaskGroups } from '@task/hooks/task-group/queries/useReadTaskGroups'
import { useKanbanDragAndDrop } from '@task/hooks/useKanbanDragAndDrop'

import { Card } from '@task/kanban/components/Card'

import { findBoardSectionContainer, initialize } from '../../utils/kanban'

import { FormUpdateTask } from './FormUpdateTask'
import { Column } from './TaskColumn'

export const TaskKanban = () => {
    const { id } = useParams()
    // @ts-ignore
    const queryKanban = useReadTaskGroups(Number(id), {
        include: ['items']
    })

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
                    (column.items ?? []).map((task: any) => ({
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
                        priority: task.priority,
                        done: task.done
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

    const [taskOpen, setTaskOpen] = useState<any | null>(null)

    const [itemsByColumns, setItemsByColumns] = useState<KanbanCardListType>({})

    useEffect(() => {
        if (!formattedData) {
            return
        }

        const dataSortByColumns = initialize(formattedData.item.tasks, formattedData.item.categories)
        setItemsByColumns(dataSortByColumns)
    }, [formattedData])

    const { activeTaskId, sensors, handleDragStart, handleDragOver } = useKanbanDragAndDrop(itemsByColumns, setItemsByColumns)

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

            /* const updatedTasks = newBoard[overContainer].map((task, index) => ({
                ...task,
                order: index,
                category_id: getIdOfColumn(overContainer)
            })) */
        }
    }

    const cardItem = activeTaskId ? formattedData?.item.tasks.find((task: any) => task.id === activeTaskId) : null

    if (!formattedData) {
        return
    }

    return (
        <KanbanContext.Provider
            value={{
                columns: formattedData.item.categories,
                data: formattedData.item.tasks,
                taskOpen,
                setTaskOpen
            }}>
            <div className="h-full">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}>
                    <ul className="flex gap-8 h-full overflow-y-hidden">
                        {Object.keys(itemsByColumns).map((key) => (
                            <li key={key}>
                                <Column id={key} items={itemsByColumns[key]} />
                            </li>
                        ))}
                        <DragOverlay dropAnimation={defaultDropAnimation}>{cardItem ? <Card item={cardItem} /> : null}</DragOverlay>
                    </ul>
                </DndContext>
                <FormUpdateTask />
            </div>
        </KanbanContext.Provider>
    )
}
