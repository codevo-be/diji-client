import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'

import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { InvoiceFields } from './InvoiceFields'

export const UpdateFormInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()

    const form = useForm<InvoiceType>({
        values: data
    })

    if (data?.status !== INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Box>
                <Form useForm={form} onSubmit={updateInvoice.mutate}>
                    <InvoiceFields />
                    <Button isLoading={updateInvoice.isPending}>Mettre à jour</Button>
                </Form>
            </Box>
        </Grid.Col>
    )
}
