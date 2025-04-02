import { FieldValues, useForm } from 'react-hook-form'

import { Button } from '../../button'
import { Form } from '../../form'
import { Modal } from '../../Modal'

import { TaskFields } from './TaskFields'

import { Icon } from '@/components/Icon'
import { useCreateKanbanTask } from '@/modules/kanban/hooks/mutations/useCreateKanbanTask'
import { KanbanCategoryType } from '@/modules/kanban/types/kanban-category.types'

type Props = {
    column: KanbanCategoryType | undefined
}

export const AddProspectCard = ({ column }: Props) => {
    const form = useForm()

    const createKanbanTask = useCreateKanbanTask()

    const handleSubmit = (data: FieldValues, handleClose: any) => {
        createKanbanTask.mutate(
            {
                kanban_slug: 'contact',
                category_id: column?.id,
                ...data
            },
            {
                onSuccess: () => {
                    handleClose()
                }
            }
        )
    }

    return (
        <Modal>
            <Modal.Trigger>
                <button
                    className={`w-full rounded border border-dashed border-grey-400 p-6 flex justify-center items-center text-grey-800 transition-all hover:text-primary hover:border-primary hover:bg-white`}>
                    <Icon name="cross" className="rotate-45 size-4 fill-current" />
                </button>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }) => {
                    return (
                        <Form useForm={form} onSubmit={(e) => handleSubmit(e, handleClose)}>
                            <TaskFields />
                            <Button isLoading={createKanbanTask.isPending} type="submit">
                                Ajouter
                            </Button>
                        </Form>
                    )
                }}
            </Modal.Content>
        </Modal>
    )
}
