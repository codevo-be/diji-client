import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { TASK_PRIORITIES } from '@task/data/priorities'
import { TASK_STATUSES } from '@task/data/statuses'
import { useKanbanContext } from '@task/kanban/contexts/KanbanContext'

import { useUpdateTaskItem } from '@task/hooks/task-item/mutations/useUpdateTaskItem'

import { Modal } from '@helpers/Modal'

export const FormUpdateTask = () => {
    const { id } = useParams()
    const { taskOpen, setTaskOpen } = useKanbanContext()
    const form = useForm({
        defaultValues: taskOpen ?? {}
    })

    const updateTaskItem = useUpdateTaskItem()

    if (!taskOpen) return null

    return (
        <Modal>
            <Modal.Content>
                {({ handleClose }) => (
                    <Form
                        useForm={form}
                        onSubmit={(data: FieldValues) => {
                            updateTaskItem.mutate(
                                {
                                    project_id: Number(id),
                                    id: taskOpen.id,
                                    ...data
                                },
                                {
                                    onSuccess: () => {
                                        handleClose()
                                        setTaskOpen(null)
                                    }
                                }
                            )
                        }}>
                        <Form.Field label="Nom" name="name" placeholder="Correction du footer" />
                        <Form.Field type="textarea" rows={5} label="Description" name="description" placeholder="Le détail..." />
                        <Form.Select name="status" label="Statut" options={Object.values(TASK_STATUSES)} />
                        <Form.Select name="priority" label="Priorité" options={Object.values(TASK_PRIORITIES)} />

                        <Button isLoading={updateTaskItem.isPending} type="submit">
                            Mettre à jour
                        </Button>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    )
}
