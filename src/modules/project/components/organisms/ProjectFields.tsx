import { Form } from '@digico/ui'

export const ProjectFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Field placeholder="Le nom du projet" name="name" required={true} label="Nom du projet" />
                <Form.Field name="start_date" type="date" label="Date de début" />
                <Form.Field name="end_date" type="date" label="Date de fin" />
            </Form.Group>
        </>
    )
}
