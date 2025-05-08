import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { useTask } from '@task/contexts/task/useTask'
import { TASK_PRIORITIES } from '@task/data/priorities'
import { TASK_STATUSES } from '@task/data/statuses'

import { useDestroyTaskItem } from '@task/hooks/task-item/mutations/useDestroyTaskItem'
import { useUpdateTaskItem } from '@task/hooks/task-item/mutations/useUpdateTaskItem'
import { useReadUsers } from '@task/hooks/user/queries/useReadUsers'

export const ModalTask = () => {
    const { id } = useParams()
    const { task, setTask } = useTask()
    const { data: users } = useReadUsers()

    const form = useForm({
        values: task ?? {}
    })

    const updateTaskItem = useUpdateTaskItem()
    const destroyTaskItem = useDestroyTaskItem()

    const onSubmit = (data: FieldValues) => {
        updateTaskItem.mutate({
            project_id: Number(id),
            ...data
        })
    }

    const onDestroy = () => {
        if (!task) return

        destroyTaskItem.mutate({
            project_id: Number(id),
            task_group_id: task.task_group_id,
            id: task.id
        })

        setTask(null)
    }

    if (!task) return null

    return (
        <Box className="sticky top-0 flex flex-col gap-4" title={`Tâche #${task.task_number}`}>
            <Form useForm={form} onSubmit={onSubmit}>
                <Form.Field label="Nom" name="name" placeholder="Correction du footer" />
                <Form.Field type="textarea" rows={5} label="Description" name="description" placeholder="Le détail ..." />
                <Form.Select name="status" label="Statut" options={Object.values(TASK_STATUSES)} />
                <Form.Select name="priority" label="Priorité" options={Object.values(TASK_PRIORITIES)} />
                <Form.Select
                    multiple
                    name="assigned_user_ids"
                    label="Utilisateurs assignés"
                    options={
                        users?.data.map((user: any) => ({
                            value: user.id,
                            label: user.name
                        })) ?? []
                    }
                />

                <Button isLoading={updateTaskItem.isPending} type="submit">
                    Mettre à jour
                </Button>
            </Form>
            <Button intent="error" isLoading={destroyTaskItem.isPending} onClick={onDestroy}>
                Supprimer
            </Button>
        </Box>
    )
}
