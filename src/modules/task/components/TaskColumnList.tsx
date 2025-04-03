import { useState } from 'react'

import { useDeleteTaskColumn } from '../hooks/supplier/mutations/useDeleteTaskColumn'
import { useUpdateTaskColumn } from '../hooks/supplier/mutations/useUpdateTaskColumn'
import { useReadTaskColumn } from '../hooks/supplier/queries/useReadTaskColumn'
import { TaskColumnType, TaskItemType } from '../types/task.types'

import {Icon} from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from '@/libs/button'
import { LoadingQuery } from '@/utils/LoadingQuery'
import { routes } from '@/utils/route'

type TaskColumnListProps = {
    onSelectTask: (task: TaskItemType | null) => void
    onAddTask: (columnId: number) => void
}

export const TaskColumnList = ({ onSelectTask, onAddTask }: TaskColumnListProps) => {
    const query = useReadTaskColumn()
    const updateColumnMutation = useUpdateTaskColumn()
    const deleteColumnMutation = useDeleteTaskColumn() // 🚀 Mutation pour supprimer une colonne

    const [editingColumnId, setEditingColumnId] = useState<number | null>(null)
    const [columnName, setColumnName] = useState<{ [key: number]: string }>({})
    const { workspace } = useAuth()

    const projectId = query.data?.items?.[0]?.project_id ?? null

    const handleEditClick = (column: TaskColumnType) => {
        setEditingColumnId(column.id)
        setColumnName((prev) => ({ ...prev, [column.id]: column.name }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, columnId: number) => {
        setColumnName((prev) => ({ ...prev, [columnId]: event.target.value }))
    }

    const handleBlur = (column: TaskColumnType) => {
        setEditingColumnId(null)

        if (columnName[column.id] && columnName[column.id] !== column.name) {
            updateColumnMutation.mutate({ columnId: column.id, data: { name: columnName[column.id] } })
        }
    }

    const handleDeleteColumn = (columnId: number) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette colonne ?")) {
            deleteColumnMutation.mutate(columnId)
        }
    }

    function handleTaskComplete(id: number) {
        console.log('Task completed:', id)
    }

    const completedTasks: { [key: number]: boolean } = {};
    return (
        <LoadingQuery query={query}>
            {({ items: columns }) => (
                <div className="grid grid-cols-1 gap-4">
                    {/* Bouton pour ajouter une colonne */}
                    <div className="flex justify-start mb-4">
                        {projectId && (
                            <Button href={routes.workspace.taskColumns.create(workspace.slug, projectId)}>
                                Ajouter une nouvelle liste
                            </Button>
                        )}
                    </div>

                    {columns.map((column: TaskColumnType) => (
                        <div key={column.id} className="bg-gray-100 p-4 rounded-lg shadow">
                            {/* Titre de la colonne (modifiable) */}
                            <div className="flex justify-between items-center">
                                {editingColumnId === column.id ? (
                                    <input
                                        type="text"
                                        value={columnName[column.id] || ""}
                                        onChange={(e) => handleChange(e, column.id)}
                                        onBlur={() => handleBlur(column)}
                                        className="text-lg font-bold w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                ) : (
                                    <h2
                                        className="text-lg font-bold cursor-pointer hover:underline"
                                        onClick={() => handleEditClick(column)}
                                    >
                                        {column.name}
                                    </h2>
                                )}

                                {/* Bouton Supprimer Colonne */}
                                <button onClick={() => handleDeleteColumn(column.id)} className="text-red-600 hover:text-red-800 w-5 h-5 flex items-center justify-center">
                                    <Icon name="cross" className="w-full h-full" />
                                </button>

                            </div>

                            {/* Liste des tâches */}
                            <div className="space-y-3">
                                {column.tasks.length > 0 ? (
                                    column.tasks.map((task: TaskItemType) => (
                                        <div key={task.id} className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {/* ✅ Checkbox pour compléter la tâche */}
                                                <button
                                                    onClick={() => handleTaskComplete(task.id)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all ${
                                                        completedTasks[task.id] ? 'bg-green-500 border-green-500' : 'border-gray-400'
                                                    }`}>
                                                    {completedTasks[task.id] && <span className="text-white text-sm">✓</span>}
                                                </button>

                                                {/* ✅ Nom de la tâche */}
                                                <span className={completedTasks[task.id] ? 'line-through text-gray-500' : ''}>
                        {task.name}
                    </span>
                                            </div>

                                            {/* ✅ Bouton Détails */}
                                            <Button onClick={() => onSelectTask(task)} intent="outlinePrimary">
                                                Détails
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Aucune tâche</p>
                                )}
                            </div>

                            {/* Bouton pour ajouter une tâche dans la colonne sélectionnée */}
                            <div className="mt-4">
                                <Button onClick={() => onAddTask(column.id)} intent="default">
                                    Ajouter une tâche
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </LoadingQuery>
    )
}
