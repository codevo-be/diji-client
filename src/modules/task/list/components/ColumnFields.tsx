import { Form } from '@digico/ui'

export const ColumnFields = () => {
    return (
        <>
            <Form.Group title="Ajouter une liste">
                <Form.Row>
                    <Form.Field name="name" label={'Nom de la liste'} />
                    <Form.Field name="order" label={'Ordre'} type={"number"} min={0}/>
                </Form.Row>
            </Form.Group>
        </>
    )
}
