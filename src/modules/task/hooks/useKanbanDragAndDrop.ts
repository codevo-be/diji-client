import { useState } from 'react'
import {
    DragOverEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { findBoardSectionContainer } from '@task/utils/kanban'



export const useKanbanDragAndDrop = (itemsByColumns: any, setItemsByColumns: (update: any) => void) => {
    const [activeTaskId, setActiveTaskId] = useState<null | number>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveTaskId(active.id as number)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        const activeContainer = findBoardSectionContainer(itemsByColumns, active.id as string)
        const overContainer = findBoardSectionContainer(itemsByColumns, over?.id as string)

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return
        }

        setItemsByColumns((boardSection: any) => {
            const activeItems = boardSection[activeContainer]
            const overItems = boardSection[overContainer]

            const activeIndex = activeItems.findIndex((item: any) => item.id == active.id)
            const overIndex = overItems.findIndex((item: any) => item.id != over?.id)

            return {
                ...boardSection,
                [activeContainer]: [...boardSection[activeContainer].filter((item: any) => item.id !== active.id)],
                [overContainer]: [
                    ...boardSection[overContainer].slice(0, overIndex),
                    itemsByColumns[activeContainer][activeIndex],
                    ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length)
                ]
            }
        })
    }

    return {
        activeTaskId,
        sensors,
        handleDragStart,
        handleDragOver,
        setActiveTaskId
    }
}
