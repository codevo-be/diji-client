import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'

import { useCreateTaskItem } from '@task/hooks/mutations'
import { useDestroyTaskItem } from '@task/hooks/mutations/useDestroyContact'
import { useUpdateTaskItem } from '@task/hooks/mutations/useUpdateTaskItem'
import { TaskItem } from '@task/types/task_item'

import { TaskFields } from '@task/list/components/TaskFields'

type Props = {
    task?: TaskItem | null
    columnId?: number | null
    onDeleteSuccess?: () => void
    onUpdateSuccess?: () => void
}

export const TaskItemForm = ({ task, onDeleteSuccess }: Props) => {
    const createItem = useCreateTaskItem()
    const updateItem = useUpdateTaskItem()
    const deleteItem = useDestroyTaskItem()

    const form = useForm<TaskItem>({
        defaultValues: {
            name: '',
            description: '',
            status: 'pending',
            priority: 1,
            task_column_id: task?.task_column_id,
        },
    })

    useEffect(() => {
        if (task) {
            form.reset({
                ...task,
            })
        }
    }, [form, task])

    const handleSubmit = (data: TaskItem) => {
        if (data.id) {
            updateItem.mutate({ id: data.id, ...data })
        } else {
            createItem.mutate(data)
        }
    }

    const handleDelete = () => {
        if (task?.id) {
            deleteItem.mutate(task.id, {
                onSuccess: () => {
                    onDeleteSuccess?.()
                },
            })
        }
    }

    const isEdit = !!task?.id

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <TaskFields />
            <div className="flex flex-col gap-2">
                <Button type="submit">
                    {isEdit ? 'Mettre à jour' : 'Ajouter une tâche'}
                </Button>
                {isEdit && (
                    <Button intent="error" type="button" onClick={handleDelete}>
                        Supprimer
                    </Button>
                )}
            </div>
        </Form>
    )
}
