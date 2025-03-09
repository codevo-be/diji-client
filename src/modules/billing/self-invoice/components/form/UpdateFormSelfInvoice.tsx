import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'

import { useUpdateSelfInvoice } from '@billing/self-invoice/hooks/mutations'
import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

import { SelfInvoiceFields } from './SelfInvoiceFields'

export const UpdateFormSelfInvoice = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))
    const updateSelfInvoice = useUpdateSelfInvoice()

    const form = useForm<SelfInvoiceType>({
        values: data
    })

    if (data?.status !== INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Box>
                <Form useForm={form} onSubmit={updateSelfInvoice.mutate}>
                    <SelfInvoiceFields />
                    <Button isLoading={updateSelfInvoice.isPending}>Mettre à jour</Button>
                </Form>
            </Box>
        </Grid.Col>
    )
}
