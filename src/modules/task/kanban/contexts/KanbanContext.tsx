import React, { createContext, useContext } from 'react'

export type KanbanCardListType = {
    [name: string]: any[]
}

export type KanbanContextType = {
    columns: any[]
    data: any[]
    taskOpen: any | null
    setTaskOpen: React.Dispatch<React.SetStateAction<any | null>>
}

export const KanbanContext = createContext<KanbanContextType | undefined>(undefined)

export const useKanbanContext = () => {
    const context = useContext(KanbanContext)

    if (!context) {
        throw new Error('useKanbanContext must be used within a KanbanProvider')
    }

    return context
}
