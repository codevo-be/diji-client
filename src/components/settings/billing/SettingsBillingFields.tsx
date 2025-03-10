import { useFormContext } from 'react-hook-form'
import { Form } from '@digico/ui'
import { countries } from 'data/countries'

import { InputFile } from '@components/temp/FieldUpload'

export const SettingsBillingFields = () => {
    const { watch } = useFormContext()

    return (
        <>
            <InputFile />
            <Form.Group>
                <Form.Field label="Nom" name="name" id="name" placeholder="Diji" />
                <Form.Row>
                    <Form.Field label="Adresse email" name="email" id="email" placeholder="info@diji.be" />
                    <Form.Field label="Numéro de téléphone" name="phone" id="phone" placeholder="0482/24.24.19" />
                    <Form.Field prefix={watch('country').toUpperCase()} label="Numéro de tva" name="vat_number" id="vat_number" placeholder="0456.354.131" />
                    <Form.Field prefix={watch('country').toUpperCase()} label="IBAN" name="iban" id="iban" placeholder="45 6245 6225 1951" />
                </Form.Row>
            </Form.Group>
            <Form.Group title="Adresse">
                <Form.Row>
                    <Form.Field label="Rue" name="street" id="street" placeholder="Route de marche" />
                    <Form.Field label="Numéro de rue" name="street_number" id="street_number" placeholder="17" />
                    <Form.Field label="Ville" name="city" id="city" placeholder="Marche-En-Famenne" />
                    <Form.Field label="Code postal" name="zipcode" id="zipcode" placeholder="5590" />
                    <Form.Select label="Pays" name="country" options={countries} />
                </Form.Row>
            </Form.Group>
        </>
    )
}
