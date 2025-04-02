'use client'

import {useEffect, useRef} from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { queryClient } from '@digico/utils'
import { toast } from 'sonner'

import { useCreateItem } from '../hooks/supplier/mutations/useCreateItem'
import { useDeleteTaskItem } from '../hooks/supplier/mutations/useDeleteTaskItem'
import { useUpdateTaskItem } from '../hooks/supplier/mutations/useUpdateTaskItem'
import { TaskItemType } from '@tasks/types/task.types'

import { TaskItemFields } from '@tasks/components/form/TaskItemFields'

type TaskItemFormProps = {
    task: TaskItemType | null
    columnId: number | null
    onDeleteSuccess: () => void
    onUpdateSuccess?: () => void
}

export const TaskItemForm = ({ task, columnId, onDeleteSuccess, onUpdateSuccess }: TaskItemFormProps) => {
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            status: 'pending',
            priority: 1,
            task_column_id: columnId
        }
    })

    const createTaskMutation = useCreateItem()
    const updateTaskMutation = useUpdateTaskItem()
    const deleteTaskMutation = useDeleteTaskItem()

    const prevTaskRef = useRef<TaskItemType | null>(null)

    useEffect(() => {
        // Vérification pour éviter un reset inutile si la tâche est identique à la précédente
        if (JSON.stringify(prevTaskRef.current) === JSON.stringify(task) && prevTaskRef.current !== null) {
            return
        }

        // Mise à jour de la référence avec la nouvelle tâche
        prevTaskRef.current = task

        if (task) {
            // Cas de l'édition : on charge les données de la tâche existante
            form.reset({
                name: task.name,
                description: task.description ?? '',
                status: task.status ?? 'pending',
                priority: task.priority ?? 1,
                task_column_id: task.task_column_id
            })
        } else {
            // Cas de la création : on utilise `columnId` pour préremplir la colonne
            form.reset({
                name: '',
                description: '',
                status: 'pending',
                priority: 1,
                task_column_id: columnId ?? null // Assure que la colonne est bien pré-remplie
            })
        }
    }, [task, columnId, form]) // ➡ Ajout de `columnId` dans les dépendances


    const handleSubmit = (data: any) => {
        if (task) {
            updateTaskMutation.mutate(
                { taskId: task.id, data },
                {
                    onSuccess: () => {
                        toast.success('Tâche mise à jour avec succès !')
                        if (onUpdateSuccess) onUpdateSuccess()
                    }
                }
            )
        } else {
            createTaskMutation.mutate(data, {
                // @ts-ignore
                onSuccess: ({ task_item }) => {
                    toast.success('Tâche ajoutée !')

                    queryClient.setQueryData(['task-columns'], (oldData: any) => {
                        if (!oldData || !oldData.items) {
                            queryClient.invalidateQueries({ queryKey: ['task-columns'] })
                            return oldData
                        }

                        return {
                            ...oldData,
                            items: oldData.items.map((column: any) => {
                                if (column.id === task_item.task_column_id) {
                                    return {
                                        ...column,
                                        tasks: [...column.tasks, task_item]
                                    }
                                }
                                return column
                            })
                        }
                    })

                    if (onUpdateSuccess) onUpdateSuccess()
                }
            })
        }
    }

    const handleDelete = () => {
        if (!task) return

        deleteTaskMutation.mutate(task.id, {
            onSuccess: () => {
                toast.success('Tâche supprimée !')

                queryClient.setQueryData(['task-columns'], (oldData: any) => {
                    if (!oldData || !oldData.items) return oldData

                    return {
                        ...oldData,
                        items: oldData.items.map((column: any) => ({
                            ...column,
                            tasks: column.tasks.filter((t: TaskItemType) => t.id !== task.id)
                        }))
                    }
                })

                onDeleteSuccess()
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <TaskItemFields />
            <div className="flex justify-between mt-4">
                <Button type="submit">Sauvegarder</Button>
                {task && (
                    <Button type="button" intent="danger" onClick={handleDelete}>
                        Supprimer
                    </Button>
                )}
            </div>
        </Form>
    )
}
