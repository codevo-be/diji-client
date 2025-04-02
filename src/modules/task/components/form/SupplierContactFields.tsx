import { Field, Row } from '@/libs/form'

export const SupplierContactFields = () => {
    return (
        <>
            <Row>
                <Field required={true} name={`firstname`} id="firstname" label="Prénom" placeholder="John" />
                <Field required={true} name={`lastname`} id="lastname" label="Nom" placeholder="Lambda" />
                <Field required={true} name={`email`} id="email" label="Adresse email" placeholder="john@gmail.com" />
                <Field name={`phone`} id="phone" label="Téléphone" placeholder="0494068123" />
            </Row>
        </>
    )
}
