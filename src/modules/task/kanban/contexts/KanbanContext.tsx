import React, { createContext, useContext } from 'react'

import { KanbanCategoryType } from '@task/types/kanban-category.types'
import { KanbanTaskType } from '@task/types/kanban-task.types'

export type KanbanCardListType = {
    [name: string]: KanbanTaskType[]
}

export type KanbanContextType = {
    columns: KanbanCategoryType[]
    data: KanbanTaskType[]
    taskOpen: KanbanTaskType | null
    setTaskOpen: React.Dispatch<React.SetStateAction<KanbanTaskType | null>>
}

export const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

export const useKanbanContext = () => {
    const context = useContext(KanbanContext)

    if (!context) {
        throw new Error('useKanbanContext must be used within a KanbanProvider')
    }

    return context
}
