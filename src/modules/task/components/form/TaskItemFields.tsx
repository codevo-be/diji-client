import { TASK_PRIORITIES } from '@tasks/helpers/priorities'
import { TASK_STATUSES } from '@tasks/helpers/statuses'

import { useReadTaskColumn } from '@tasks/hooks/supplier/queries/useReadTaskColumn'

import { Field } from '@digico/ui/dist/types/components/Form/Field'
import { Group } from '@digico/ui/dist/types/components/Form/Group'
import { Row } from '@digico/ui/dist/types/components/Form/Row'

export const TaskItemFields = () => {
    const { data: columnsData } = useReadTaskColumn(); // Récupérer les colonnes

    // Transformer les colonnes en options pour le Select
    const columnOptions = columnsData?.items.map((column: { id: number; name: string }) => ({
        label: column.name,
        value: column.id,
    })) || [];

    return (
        <>
            <Group>
                <Row>
                    <Field required name="name" id="name" label="Nom de la tâche" placeholder="Titre de la tâche" />

                    {/* Liste déroulante pour le statut */}
                    <div className="w-full">
                        {/*<Select name="status" label="Statut" options={Object.values(TASK_STATUSES)} placeholder="Choisir un statut">*/}
                        {/*    <Select.Field />*/}
                        {/*</Select>*/}
                    </div>
                </Row>

                <Row>
                    {/* Liste déroulante pour la priorité */}
                    <div className="w-full">
                        {/*<Select name="priority" label="Priorité" options={Object.values(TASK_PRIORITIES)} placeholder="Sélectionner une priorité">*/}
                        {/*    <Select.Field />*/}
                        {/*</Select>*/}
                    </div>

                    {/* Liste déroulante pour choisir une colonne */}
                    <div className="w-full">
                        {/*<Select name="task_column_id" label="Colonne" options={columnOptions} placeholder="Sélectionner une colonne">*/}
                        {/*    <Select.Field />*/}
                        {/*</Select>*/}
                    </div>
                </Row>

                <Field rows={4} type="textarea" name="description" id="description" label="Description" placeholder="Détails de la tâche" />
            </Group>
        </>
    )
}
