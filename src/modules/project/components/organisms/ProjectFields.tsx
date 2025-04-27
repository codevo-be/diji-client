import { Form } from '@digico/ui'

export const ProjectFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Field placeholder="Le nom du projet" name="name" required={true} label={'Nom du projet'} />
            </Form.Group>
        </>
    )
}
