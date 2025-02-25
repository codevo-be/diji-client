import { Form } from '@digico/ui'

export const ContactFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Row>
                    <Form.Field name={`company_name`} id="company_name" label="Société" placeholder="Google" />
                    <Form.Field name={`vat_number`} id="vat_number" label="Numéro de tva" placeholder="0456.232.567" />
                    <Form.Field name={`firstname`} id="firstname" label="Prénom" placeholder="Bertrand" />
                    <Form.Field name={`lastname`} id="lastname" label="Nom" placeholder="Lambda" />
                </Form.Row>
            </Form.Group>
            <Form.Group>
                <Form.Row>
                    <Form.Field name={`email`} id="email" label="Adresse email" placeholder="bertrand@gmail.com" />
                    <Form.Field name={`phone`} id="phone" label="Téléphone" placeholder="0494068124" />
                </Form.Row>
            </Form.Group>
        </>
    )
}
