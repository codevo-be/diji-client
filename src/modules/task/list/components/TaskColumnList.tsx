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
        }[]
    }[]
    onSelectTask?: (task: TaskItem) => void
}

export const TaskColumnList = ({ items, onSelectTask }: Props) => {
    return (
        <div className="space-y-6">
            {items.map((col) => (
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

                    <Button
                        onClick={() =>
                            onSelectTask?.({
                                task_column_id: col.id,
                            })
                        }
                    >
                        Ajouter une tâche
                    </Button>
                </div>
            ))}
        </div>
    )
}
