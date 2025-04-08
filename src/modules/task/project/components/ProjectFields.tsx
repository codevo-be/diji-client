import { Form } from '@digico/ui'

export const ProjectFields = () => {
    return (
        <>
            <Form.Group title="Gérer le projet">
                <Form.Field name="name" label={'Nom du projet'} />
                <Form.Field name="description" label={'Description'} type={"textarea"} />
            </Form.Group>
        </>
    )
}
