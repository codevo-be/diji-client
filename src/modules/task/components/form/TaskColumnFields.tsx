import { useParams} from "next/navigation";

import { Field } from '@digico/ui/dist/types/components/Form/Field'
import { Group } from '@digico/ui/dist/types/components/Form/Group'
import { Row } from '@digico/ui/dist/types/components/Form/Row'


export const TaskColumnFields = () => {
    const { project_id } = useParams()
    return (
        <>
            <Group>
                <Row>
                    <Field required={true} name="name" id="name" label="Nom de la colonne" placeholder="À faire" />
                    <Field required={true} name="order" id="order" label="Ordre" type="number" placeholder="1" />
                </Row>
            </Group>
            <input type="hidden" name="project_id" value={project_id} />
        </>
    )
}
