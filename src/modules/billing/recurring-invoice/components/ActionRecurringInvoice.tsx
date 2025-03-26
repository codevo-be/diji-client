import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { RECURRING_INVOICE_STATUSES } from '@billing/recurring-invoice/data/recurring-invoice-statuses'
import { Box, Form, Grid } from '@digico/ui'

import { useUpdateRecurringInvoice } from '@billing/recurring-invoice/hooks/mutations'
import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'

export const ActionRecurringInvoice = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))
    const updateRecurringInvoice = useUpdateRecurringInvoice()
    const form = useForm({
        values: {
            id: id,
            status: data?.status ?? 'draft'
        }
    })

    const onSubmit = (value: 'draft' | 'active' | 'inactive') => {
        updateRecurringInvoice.mutate({
            id: Number(id),
            status: value
        })
    }

    return (
        <Grid.Col>
            <Box>
                <Form useForm={form}>
                    {/* @ts-ignore */}
                    <Form.Select onChange={onSubmit} label="Statut" name="status" options={Object.values(RECURRING_INVOICE_STATUSES)} />
                </Form>
            </Box>
        </Grid.Col>
    )
}
