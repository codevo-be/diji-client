import { useParams} from "next/navigation";

import { Field, Group, Row } from '@/libs/form'

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
