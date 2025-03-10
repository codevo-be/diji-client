'use client'

import { useFormContext } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

import { useReadContacts } from '@contact/hooks/queries'

export const SelfInvoiceFields = () => {
    const form = useFormContext()
    const { data: contact } = useReadContacts()

    const onChangeContact = (id: string | number) => {
        const item = contact?.data.find((contact) => contact.id === id)

        if (!item) {
            return
        }

        form.setValue('contact_name', item.display_name)
        form.setValue('vat_number', item.vat_number)
    }

    return (
        <>
            <Form.Group title="Expéditeur">
                <Form.Row>
                    <Form.Field required={true} name={`issuer.name`} id="issuer.name" label="Nom de l'expéditeur" placeholder="Nom complet" />
                    <Form.Field name={`issuer.vat_number`} id="issuer.vat_number" label="Numéro de tva" placeholder="be2532.245.135" />
                </Form.Row>
                <Form.Field
                    required={true}
                    type="textarea"
                    rows={2}
                    name={`issuer.address`}
                    id="issuer.address"
                    label="Adresse"
                    placeholder="Adresse complète"
                />
                <Form.Field required={true} name={`issuer.iban`} id="issuer.iban" label="Compte bancaire" placeholder="4024.2421.4241" />
            </Form.Group>
            <Form.Group title="Client">
                <Form.Row>
                    <Form.Select
                        name="contact_id"
                        label={'Contact'}
                        onChange={onChangeContact}
                        options={
                            contact?.data
                                ? contact?.data.map((contact) => {
                                      return {
                                          label: contact.display_name,
                                          value: contact.id
                                      }
                                  })
                                : []
                        }
                    />
                </Form.Row>
                <Form.Row>
                    <Form.Field name={`contact_name`} id="contact_name" label="Nom du client" placeholder="Bertrand" />
                    <Form.Field name={`vat_number`} id="vat_number" label="Numéro de tva" placeholder="e2532.245.135" />
                    <Form.Field name={`street`} id="street" label="Rue" placeholder="Route de marche" />
                    <Form.Field name={`street_number`} id="street_number" label="Numéro de rue" placeholder="12" />
                    <Form.Field name={`city`} id="city" label="Ville" placeholder="Namur" />
                    <Form.Field name={`zipcode`} id="zipcode" label="Code postal" placeholder="5590" />
                    <Form.Select name="country" label={'Pays'} options={countries} />
                </Form.Row>
            </Form.Group>
            <Form.Group title="Date">
                <Form.Row>
                    <Form.Field type="date" name={`date`} id="date" label="Date de création" />
                    <Form.Field type="date" name={`due_date`} id="due_date" label="Date d'échéance" />
                </Form.Row>
            </Form.Group>
        </>
    )
}
