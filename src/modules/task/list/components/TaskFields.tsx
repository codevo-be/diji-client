import { useParams } from 'next/navigation'

import { Form } from '@digico/ui'
import { TASK_PRIORITIES } from '@task/data/priorities'
import { TASK_STATUSES } from '@task/data/statuses'

import { useReadColumns } from '@task/hooks/queries'

export const TaskFields = () => {
    const { id } = useParams()
    // @ts-ignore
    const { data: columnsData } = useReadColumns(id);

    const columnOptions = columnsData?.data.map((column: { id: number; name: string }) => ({
        label: column.name,
        value: column.id,
    })) || [];

    return (
        <>
            <Form.Group title="Tâche">
                <Form.Row>
                    <Form.Field name="name" label={'Nom de la tâche'} />
                    <Form.Select name="status" label={'Statut'} options={Object.values(TASK_STATUSES)} />
                </Form.Row>
                <Form.Row>
                    <Form.Select name="priority" label={'Priorité'} options={Object.values(TASK_PRIORITIES)} />
                    <Form.Select name="task_column_id" label={'Colonne'} options={columnOptions} />
                </Form.Row>
                <Form.Field type={"textarea"} name="description" label={'Description'} />
                <Form.Checkbox name="done" label="Tâche terminée" id={"1"}/>
            </Form.Group>
        </>
    )
}
