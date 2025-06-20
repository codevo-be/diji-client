'use client'

import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const IssuerFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Field required={true} name={`issuer.name`} id="issuer.name" label="Nom" placeholder="Nom complet" />
                <Form.Row>
                    <Form.Field name={`issuer.vat_number`} id="issuer.vat_number" label="Numéro de tva" placeholder="2532.245.135" />
                    <Form.Field required={true} name={`issuer.iban`} id="issuer.iban" label="IBAN" placeholder="4562.2452.2456" />
                    <Form.Field type="email" name={`issuer.email`} id="issuer.email" label="Adresse email" placeholder="info@diji.be" />
                    <Form.Field name={`issuer.phone`} id="issuer.phone" label="Numéro de téléphone" placeholder="0593/02.52.13" />
                </Form.Row>
            </Form.Group>

            <Form.Group className="mt-12" title="Adresse">
                <Form.Row>
                    <Form.Field required={true} name={`issuer.street`} id="issuer.street" label="Rue" placeholder="Route de marche" />
                    <Form.Field required={true} name={`issuer.street_number`} id="issuer.street_number" label="Numéro de rue" placeholder="12" />
                    <Form.Field required={true} name={`issuer.city`} id="issuer.city" label="Ville" placeholder="Marche-En-Famenne" />
                    <Form.Field required={true} name={`issuer.zipcode`} id="issuer.zipcode" label="Code postal" placeholder="6900" />
                    <Form.Select required={true} name={`issuer.country`} label="Pays" options={countries} />
                </Form.Row>
            </Form.Group>
        </>
    )
}
