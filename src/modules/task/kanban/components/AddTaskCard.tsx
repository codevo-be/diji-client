import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { TASK_PRIORITIES } from '@task/data/priorities'
import { TASK_STATUSES } from '@task/data/statuses'

import { useCreateTaskItem } from '@task/hooks/task-item/mutations/useCreateTaskItem'

import { Icon } from '@components/Icon'
import { Modal } from '@helpers/Modal'

export const AddCard = ({ taskGroupId }: { taskGroupId: number }) => {
    const { id } = useParams()
    const createTaskItem = useCreateTaskItem()

    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            status: 'todo',
            priority: 0
        }
    })

    return (
        <Modal>
            <Modal.Trigger>
                <button className="w-full rounded border border-dashed border-grey-400 p-6 flex justify-center items-center text-grey-800 transition-all hover:text-primary hover:border-primary hover:bg-white">
                    <Icon name="cross" className="rotate-45 size-4 fill-current" />
                </button>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }) => (
                    <Form
                        useForm={form}
                        onSubmit={(data: FieldValues) => {
                            createTaskItem.mutate(
                                {
                                    project_id: Number(id),
                                    task_group_id: taskGroupId,
                                    ...data
                                },
                                {
                                    onSuccess: () => {
                                        handleClose()
                                    }
                                }
                            )
                        }}>
                        <Form.Field label="Nom" name="name" placeholder="Correction du footer" />
                        <Form.Field type="textarea" rows={5} label="Description" name="description" placeholder="Le détail..." />
                        <Form.Select name="status" label="Statut" options={Object.values(TASK_STATUSES)} />
                        <Form.Select name="priority" label="Priorité" options={Object.values(TASK_PRIORITIES)} />

                        <Button isLoading={createTaskItem.isPending} type="submit">
                            Créer la tâche
                        </Button>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    )
}
