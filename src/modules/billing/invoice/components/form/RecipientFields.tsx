'use client'

import { useFormContext } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const RecipientFields = () => {
    const { watch } = useFormContext()

    return (
        <>
            <Form.Group>
                <Form.Row>
                    <Form.Field required={true} name={`recipient.name`} id="recipient.name" label="Nom" placeholder="Nom complet" />
                    <Form.Field
                        prefix={watch('recipient.country') ? watch('recipient.country').toUpperCase() : 'BE'}
                        name={`recipient.vat_number`}
                        id="recipient.vat_number"
                        label="Numéro de tva"
                        placeholder="2532.245.135"
                    />
                </Form.Row>
            </Form.Group>

            <Form.Group className="mt-12" title="Adresse">
                <Form.Row>
                    <Form.Field required={true} name={`recipient.street`} id="recipient.street" label="Rue" placeholder="Route de marche" />
                    <Form.Field required={true} name={`recipient.street_number`} id="recipient.street_number" label="Numéro de rue" placeholder="12" />
                    <Form.Field required={true} name={`recipient.city`} id="recipient.city" label="Ville" placeholder="Marche-En-Famenne" />
                    <Form.Field required={true} name={`recipient.zipcode`} id="recipient.zipcode" label="Code postal" placeholder="6900" />
                    <Form.Select required={true} name={`recipient.country`} label="Pays" options={countries} />
                </Form.Row>
            </Form.Group>
        </>
    )
}
