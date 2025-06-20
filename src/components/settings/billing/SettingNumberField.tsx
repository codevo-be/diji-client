import { Box, Form } from '@digico/ui'

export const SettingNumberField = () => {
    return (
        <Box title="Facturation">
            <Form.Group>
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
        </Box>
    )
}
