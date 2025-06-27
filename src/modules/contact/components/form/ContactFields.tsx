'use client'

import { useFormContext } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const ContactFields = () => {
    const { watch, setValue } = useFormContext()

    return (
        <>
            <Form.Group title="Société">
                <Form.Row>
                    <Form.Field name="company_name" label="Société" placeholder="Google" />
                    <Form.Field name="vat_number" label="Numéro de TVA" placeholder="BE0456.232.567" />
                    <Form.Field name="iban" label="IBAN" placeholder="BE12 3456 7890 1234" />

                    {watch('vat_number') && (
                        <>
                            <Form.Select
                                onChange={(value) => {
                                    const vat_number = watch('vat_number')

                                    const cleanedVat = vat_number.replace(/\s/g, '').replace(/\./g, '')

                                    if (value === 'vat') {
                                        setValue('peppol_identifier', `9925:${cleanedVat}`)
                                    } else if (value === 'enterprise') {
                                        const vatDigitsOnly = cleanedVat.replace(/\D/g, '')
                                        setValue('peppol_identifier', `0208:${vatDigitsOnly}`)
                                    }
                                }}
                                name="peppol_type"
                                label="Type d’identifiant Peppol"
                                options={[
                                    { label: 'Numéro de TVA', value: 'vat' },
                                    { label: 'Numéro d’entreprise', value: 'enterprise' }
                                ]}
                            />
                        </>
                    )}
                </Form.Row>
            </Form.Group>

            <Form.Group title="Particulier">
                <Form.Row>
                    <Form.Field name="firstname" label="Prénom" placeholder="Bertrand" />
                    <Form.Field name="lastname" label="Nom" placeholder="Lambda" />
                    <Form.Field name="email" label="Adresse email" placeholder="bertrand@gmail.com" />
                    <Form.Field name="phone" label="Téléphone" placeholder="0494 06 81 24" />
                </Form.Row>
            </Form.Group>

            <Form.Group title="Adresse de facturation">
                <Form.Row>
                    <Form.Field name="billing_address.street" label="Rue" placeholder="Route de marche" />
                    <Form.Field name="billing_address.street_number" label="Numéro" placeholder="12" />
                    <Form.Field name="billing_address.city" label="Ville" placeholder="Namur" />
                    <Form.Field name="billing_address.zipcode" label="Code postal" placeholder="5590" />
                    <Form.Select name="billing_address.country" label="Pays" options={countries} />
                </Form.Row>
            </Form.Group>
        </>
    )
}
