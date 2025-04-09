'use client'

import { Box, Button } from '@digico/ui'

import { TaskItem } from '@task/types/task_item'

type Props = {
    items: {
        id: number
        name: string
        order: number
        project_id: number
        items: {
            id: number
            name: string
            description: string | null
            status: string
            priority: number
            order: number
            done: boolean
        }[]
    }[]
    onSelectTask?: (task: TaskItem) => void
}

export const TaskColumnList = ({ items, onSelectTask }: Props) => {
    const doneTasks = items.flatMap(col =>
        col.items.filter(item => item.done)
    )

    const activeColumns = items.map(col => ({
        ...col,
        items: col.items.filter(item => !item.done),
    }))

    const doneColumn = {
        id: -1,
        name: 'Tâches terminées',
        order: 999,
        project_id: -1,
        items: doneTasks,
    }

    const finalColumns = [...activeColumns, ...(doneTasks.length ? [doneColumn] : [])]

    return (
        <div className="space-y-6">
            {finalColumns.map((col) => (
                <div key={col.id}>
                    <div className="text-lg font-semibold mb-2">{col.name}</div>

                    <div className="pl-4 space-y-1 text-sm text-gray-700">
                        {col.items.length > 0 ? (
                            col.items.map((item) => (
                                <Box
                                    key={item.id}
                                    className="border-b border-gray-100 py-4 cursor-pointer hover:bg-gray-50"
                                    // @ts-ignore
                                    onClick={() =>
                                        onSelectTask?.({
                                            ...item,
                                            task_column_id: col.id,
                                        })
                                    }
                                >
                                    {item.name}
                                </Box>
                            ))
                        ) : (
                            <li className="text-gray-400 italic">Aucun item</li>
                        )}
                    </div>

                    {col.id !== -1 && (
                        <Button
                            onClick={() =>
                                onSelectTask?.({
                                    task_column_id: col.id,
                                })
                            }
                        >
                            Ajouter une tâche
                        </Button>
                    )}
                </div>
            ))}
        </div>
    )
}