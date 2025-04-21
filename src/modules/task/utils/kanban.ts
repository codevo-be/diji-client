import { KanbanCardListType } from '@task/kanban/contexts/KanbanContext'

export const initialize = (data: any[], columns: any[]) => {
    const items: KanbanCardListType = {}

    // Trier les colonnes par leur champ "order"
    const sortedColumns = columns.sort((a, b) => a.order - b.order)
    sortedColumns
        .map((column) => `column_${column.id}`)
        .forEach((key) => {
            items[key] = data.filter((item) => item.category_id === getIdOfColumn(key)).sort((a, b) => a.order - b.order) // Trie les tâches par ordre
        })

    return items
}

export const findBoardSectionContainer = (boardSections: KanbanCardListType, id: string) => {
    if (id in boardSections) {
        return id
    }

    return Object.keys(boardSections).find((key) => boardSections[key].find((item) => item.id === Number(id)))
}

export const getIdOfColumn = (column: string) => {
    return Number(column.replace('column_', ''))
}
