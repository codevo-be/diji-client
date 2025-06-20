'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const ContactFields = () => {
    const { control, setValue } = useFormContext()
    const vatNumber = useWatch({ control, name: 'vat_number' })
    const peppolType = useWatch({ control, name: 'peppol_type' })

    // Supprimer les caractère inutile et placer ou non le BE en fonction du type sélectionné.
    useEffect(() => {
        if (!vatNumber || !peppolType) return

        const cleanedVat = vatNumber.replace(/\s/g, '').replace(/\./g, '')

        let identifier = ''

        if (peppolType === 'vat') {
            identifier = `9925:${cleanedVat}`
        } else if (peppolType === 'enterprise') {
            const vatDigitsOnly = cleanedVat.replace(/\D/g, '')
            identifier = `0208:${vatDigitsOnly}`
        }

        setValue('peppol_identifier', identifier)
    }, [vatNumber, peppolType, setValue])

    return (
        <>
            <Form.Group>
                <Form.Row>
                    <Form.Field name="company_name" label="Société" placeholder="Google" />
                    <Form.Field name="vat_number" label="Numéro de TVA" placeholder="BE0456.232.567" />
                    <Form.Field name="iban" label="IBAN" placeholder="BE12 3456 7890 1234" />

                    {vatNumber && (
                        <>
                            <Form.Select
                                name="peppol_type"
                                label="Type d’identifiant"
                                options={[
                                    { label: 'Numéro de TVA', value: 'vat' },
                                    { label: 'Numéro d’entreprise', value: 'enterprise' }
                                ]}
                            />
                        </>
                    )}
                </Form.Row>

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
            <Form.Field name="peppol_identifier" readOnly hidden={true} />
        </>
    )
}
