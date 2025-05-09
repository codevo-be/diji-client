import { useParams } from 'next/navigation'

import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { TASK_PRIORITIES } from '@task/data/priorities'
import { TASK_STATUSES } from '@task/data/statuses'

import { useUpdateTaskItem } from '@task/hooks/task-item/mutations/useUpdateTaskItem'

import { Icon } from '@components/Icon'
import { Modal } from '@helpers/Modal'

type Props = {
    item: any
}

export const Card = ({ item }: Props) => {
    const { id } = useParams()
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)
    const form = useForm({
        defaultValues: {
            id: item.id,
            task_group_id: item.category_id,
            name: item.title,
            description: item.content,
            status: item.status,
            priority: item.priority
        }
    })
    const updateTaskItem = useUpdateTaskItem()

    console.log('Item', item)

    const handleMouseDown = () => {
        setClickTimer(
            setTimeout(() => {
                setClickTimer(null)
            }, 200)
        )
    }

    const handleMouseUp = () => {
        if (clickTimer) {
            clearTimeout(clickTimer)
            setClickTimer(null)
        }
    }

    return (
        <Modal>
            <Modal.Trigger>
                <div className="relative rounded bg-white border border-grey-200 p-6 cursor-pointer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                    <div className="flex justify-between gap-4">
                        <p className="font-medium text-xs">{item.title}</p>
                        <Icon name="edit" className="size-6 fill-grey-600 transition-all group-hover:fill-primary" />
                    </div>
                    {item.sum ? <div className="font-medium text-grey-600 text-xs">{formatCurrency(item.sum)}</div> : null}
                    {item.content && <div className="text-sm text-grey-600 mt-4">{item.content}</div>}
                </div>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }) => (
                    <Form
                        useForm={form}
                        onSubmit={(data: FieldValues) => {
                            updateTaskItem.mutate(
                                {
                                    project_id: Number(id),
                                    id: item.id,
                                    ...data
                                },
                                {
                                    onSuccess: () => {
                                        handleClose()
                                    }
                                }
                            )
                        }}>
                        <Form.Field label="Nom" name="name" placeholder="Nom de la tâche" />
                        <Form.Field type="textarea" rows={5} label="Description" name="description" placeholder="Détail de la tâche..." />
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
