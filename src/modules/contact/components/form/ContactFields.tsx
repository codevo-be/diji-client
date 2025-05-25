'use client'

import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const ContactFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Row>
                    <Form.Field name={`company_name`} id="company_name" label="Société" placeholder="Google" />
                    <Form.Field name={`vat_number`} id="vat_number" label="Numéro de tva" placeholder="0456.232.567" />
                    <Form.Field name={`iban`} id="iban" label="IBAN" placeholder="04564.2322.5167" />
                </Form.Row>
                <Form.Row>
                    <Form.Field name={`firstname`} id="firstname" label="Prénom" placeholder="Bertrand" />
                    <Form.Field name={`lastname`} id="lastname" label="Nom" placeholder="Lambda" />
                    <Form.Field name={`email`} id="email" label="Adresse email" placeholder="bertrand@gmail.com" />
                    <Form.Field name={`phone`} id="phone" label="Téléphone" placeholder="0494068124" />
                </Form.Row>
            </Form.Group>

            <Form.Group title="Adresse de facturation">
                <Form.Row>
                    <Form.Field name={`billing_address.street`} id="billing_address.street" label="Rue" placeholder="Route de marche" />
                    <Form.Field name={`billing_address.street_number`} id="billing_address.street_number" label="Numéro de rue" placeholder="12" />
                    <Form.Field name={`billing_address.city`} id="billing_address.city" label="Ville" placeholder="Namur" />
                    <Form.Field name={`billing_address.zipcode`} id="billing_address.zipcode" label="Code postal" placeholder="5590" />
                    <Form.Select name="billing_address.country" label={'Pays'} options={countries} />
                </Form.Row>
            </Form.Group>
        </>
    )
}
