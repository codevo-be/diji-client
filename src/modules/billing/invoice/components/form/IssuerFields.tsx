'use client'

import { useFormContext } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

import { useReadContacts } from '@contact/hooks/queries'
import { ContactType } from '@contact/types/contact'

export const IssuerFields = () => {
    const { watch, setValue } = useFormContext()

    const { data } = useReadContacts()

    const onSelectContact = (contact_id: number | string) => {
        const contact = data?.data.find((contact: ContactType) => contact.id === contact_id)

        setValue('issuer', contact?.billing_address)
        setValue('issuer.name', contact?.display_name)
        setValue('issuer.vat_number', contact?.vat_number)
    }
    return (
        <>
            <Form.Group>
                <Form.Select
                    name="contact_id"
                    label="Contact"
                    onChange={onSelectContact}
                    options={
                        data?.data.map((contact: ContactType) => {
                            return {
                                label: contact.display_name,
                                value: contact.id
                            }
                        }) ?? []
                    }
                />
                <Form.Field required={true} name={`issuer.name`} id="issuer.name" label="Nom" placeholder="Nom complet" />
                <Form.Row>
                    <Form.Field
                        prefix={watch('issuer.country') ? watch('issuer.country').toUpperCase() : 'BE'}
                        name={`issuer.vat_number`}
                        id="issuer.vat_number"
                        label="Numéro de tva"
                        placeholder="2532.245.135"
                    />
                    <Form.Field
                        required={true}
                        prefix={watch('issuer.country') ? watch('issuer.country').toUpperCase() : 'BE'}
                        name={`issuer.iban`}
                        id="issuer.iban"
                        label="IBAN"
                        placeholder="4562.2452.2456"
                    />
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
