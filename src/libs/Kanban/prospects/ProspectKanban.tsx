import React, { useEffect, useState } from 'react'
import {
    closestCorners,
    defaultDropAnimation,
    DndContext,
    DragEndEvent,
    DragOverlay
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { Card } from '../common/Card'
import { KanbanCardListType, KanbanContext } from '../contexts/KanbanContext'
import { findBoardSectionContainer, getIdOfColumn, initialize } from '../utils/kanban'

import { FormUpdateTask } from './FormUpdateTask'
import { Column } from './ProspectColumn'

import {useKanbanDragAndDrop} from "@/libs/Kanban/common/hooks/useKanbanDragAndDrop";
import { useUpdateKanbanTask } from '@/modules/kanban/hooks/mutations/useUpdateSupplier'
import { useReadKanban } from '@/modules/kanban/hooks/queries/useReadKanban'
import { KanbanType } from '@/modules/kanban/types/kanban.types'
import { KanbanCategoryType } from '@/modules/kanban/types/kanban-category.types'
import { KanbanTaskType } from '@/modules/kanban/types/kanban-task.types'
import { LoadingQuery } from '@/utils/LoadingQuery'

type Props = {
    slug: 'contact'
    returnOnDragEnd?: (event: DragEndEvent) => void
}

export const Kanban = ({ slug, returnOnDragEnd }: Props) => {
    const [taskOpen, setTaskOpen] = useState<KanbanTaskType | null>(null)

    const queryKanban = useReadKanban(slug, {
        with: ['tasks', 'categories']
    })

    const updateKanbanTask = useUpdateKanbanTask()

    const [itemsByColumns, setItemsByColumns] = useState<KanbanCardListType>({})

    useEffect(() => {
        if (!queryKanban.isSuccess) {
            return
        }

        const dataSortByColumns = initialize(queryKanban.data.tasks, queryKanban.data.categories ?? [])
        setItemsByColumns(dataSortByColumns)
    }, [queryKanban.data])

    const { activeTaskId, sensors, handleDragStart, handleDragOver, setActiveTaskId } = useKanbanDragAndDrop(itemsByColumns, setItemsByColumns)

    const handleDragEnd = (event: DragEndEvent) => {
        const active = event.active
        const over = event.over
        const activeContainer = findBoardSectionContainer(itemsByColumns, active.id as string)
        const overContainer = findBoardSectionContainer(itemsByColumns, over?.id as string)

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return
        }

        if (returnOnDragEnd) {
            returnOnDragEnd(event)
        }

        const activeIndex = itemsByColumns[activeContainer].findIndex((task: any) => task.id === active.id)
        const overIndex = itemsByColumns[overContainer].findIndex((task: any) => task.id === over?.id)

        if (activeIndex !== overIndex) {
            setItemsByColumns((boardSection: any) => ({
                ...boardSection,
                [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex)
            }))
        }

        updateKanbanTask.mutate({
            id: active.id,
            kanban_slug: slug,
            category_id: getIdOfColumn(overContainer),
            order: overIndex === -1 ? 1 : overIndex
        })

        setActiveTaskId(null)
    }

    const cardItem = activeTaskId ? queryKanban.data?.tasks.find((item: KanbanTaskType) => item.id == activeTaskId) : null

    return (
        <LoadingQuery query={queryKanban}>
            {(data: KanbanType & { categories: KanbanCategoryType[]; tasks: KanbanTaskType[] }) => {
                return (
                    <KanbanContext.Provider
                        value={{
                            columns: data.categories,
                            data: data.tasks,
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
                                            <Column id={key} items={itemsByColumns[String(key)]} />
                                        </li>
                                    ))}
                                    <DragOverlay dropAnimation={defaultDropAnimation}>{cardItem ? <Card item={cardItem} /> : null}</DragOverlay>
                                </ul>
                            </DndContext>

                            <FormUpdateTask />
                        </div>
                    </KanbanContext.Provider>
                )
            }}
        </LoadingQuery>
    )
}
