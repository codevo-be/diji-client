import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

export const SettingNumberField = () => {
    const queryMeta = useReadMeta('tenant_billing_details')

    const updateOrCreateMeta = useUpdateOrCreateMeta()

    const form = useForm<any>({
        values: queryMeta.data?.value
    })

    const onSubmit = (data: any) => {
        updateOrCreateMeta.mutate(
            {
                key: 'tenant_billing_details',
                value: data,
                type: 'json'
            },
            {
                onSuccess: () => {
                    toast.success('Les données de facturation ont été mises à jour !')
                }
            }
        )
    }

    return (
        <Box title="Facturation">
            <Form useForm={form} onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Row>
                        <Form.Field
                            label="Numéro de départ des factures"
                            name="invoice_start_number"
                            id="invoice_start_number"
                            type="number"
                            placeholder="50"
                        />
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

                <Button type="submit">Sauvegarder</Button>
            </Form>
        </Box>
    )
}
