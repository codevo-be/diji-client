import { Form } from '@digico/ui'

export const ColumnFields = () => {
    return (
        <>
            <Form.Group title="Ajouter une liste">
                    <Form.Field name="name" label={'Nom de la liste'} />
                    <Form.Field name="order" label={''} type={"number"} defaultValue={999} min={1} hidden={true}/>
            </Form.Group>
        </>
    )
}
