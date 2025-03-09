import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Form, Grid } from '@digico/ui'

import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { Tabs } from '@components/temp/Tab'

import { IssuerFields } from './IssuerFields'
import { RecipientFields } from './RecipientFields'

export const UpdateFormInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()

    const form = useForm<InvoiceType>({
        values: data,
        defaultValues: {
            issuer: {
                country: 'be'
            },
            recipient: {
                country: 'be'
            }
        }
    })

    if (data?.status !== INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateInvoice.mutate}>
                <Box>
                    <Tabs defaultStep={'issuer'}>
                        <Tabs.Head id="issuer">Expéditeur</Tabs.Head>
                        <Tabs.Head id="recipient">Destinataire</Tabs.Head>
                        <Tabs.Content id={'issuer'}>
                            <IssuerFields />
                        </Tabs.Content>
                        <Tabs.Content id={'recipient'}>
                            <RecipientFields />
                        </Tabs.Content>
                    </Tabs>
                </Box>
            </Form>
        </Grid.Col>
    )
}
