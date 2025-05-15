import { Form } from '@digico/ui'
import { countries } from 'data/countries'

export const SettingsBillingFields = () => {
    return (
        <>
            <Form.Group>
                <Form.File name="logo" />
                <Form.Field label="Nom" name="name" id="name" placeholder="Diji" />
                <Form.Row>
                    <Form.Field label="Adresse email" name="email" id="email" placeholder="info@diji.be" />
                    <Form.Field label="Numéro de téléphone" name="phone" id="phone" placeholder="0482/24.24.19" />
                    <Form.Field label="Numéro de tva" name="vat_number" id="vat_number" placeholder="0456.354.131" />
                    <Form.Field label="IBAN" name="iban" id="iban" placeholder="BE45 6245 6225 1951" />
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

            <Form.Group title="Facturation">
                <Form.Row>
                    <Form.Field label="Numéro de départ des factures" name="invoice_start_number" id="invoice_start_number" type="number" placeholder="50" />
                    <Form.Field
                        label="Numéro de départ des notes de crédit"
                        name="credit_note_start_number"
                        id="credit_note_start_number"
                        type="number"
                        placeholder="50"
                    />
                </Form.Row>
                <Form.Row>
                    <Form.Field label="Numéro de départ des devis" name="estimate_start_number" id="estimate_start_number" type="number" placeholder="50" />
                    <Form.Field
                        label="Numéro de départ des autofacturations"
                        name="self_invoice_start_number"
                        id="self_invoice_start_number"
                        type="number"
                        placeholder="50"
                    />
                </Form.Row>
            </Form.Group>
        </>
    )
}
