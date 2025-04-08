import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useCreateTaskItem } from '@task/hooks/mutations'
import { useUpdateTaskItem } from '@task/hooks/mutations/useUpdateTaskItem'
import { TaskItem } from '@task/types/task_item'

import { TaskFields } from '@task/list/components/TaskFields'

type Props = {
    task?: TaskItem | null
    columnId?: number | null
    onDeleteSuccess?: () => void
    onUpdateSuccess?: () => void
}

export const TaskItemForm = ({ task }: Props) => {
    const createItem = useCreateTaskItem()
    const updateItem = useUpdateTaskItem()

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

    const isEdit = !!task?.id

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <TaskFields />
                <Button type="submit">
                    {isEdit ? 'Mettre à jour' : 'Ajouter une tâche'}
                </Button>
            </Form>
        </Box>
    )
}
