import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { InvoiceFields } from './InvoiceFields'

export const UpdateFormInvoice = () => {
    const { id } = useParams()
    const queryInvoice = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()

    const form = useForm<InvoiceType>({
        values: queryInvoice.data?.data
    })

    return (
        <Box>
            <Form useForm={form} onSubmit={updateInvoice.mutate}>
                <InvoiceFields />
                <Button isLoading={updateInvoice.isPending}>Mettre à jour</Button>
            </Form>
        </Box>
    )
}
