import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid, Tabs } from '@digico/ui'

import { useUpdateSelfInvoice } from '@billing/self-invoice/hooks/mutations'
import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

import { IssuerFields } from '@billing/invoice/components/form/IssuerFields'
import { RecipientFields } from '@billing/invoice/components/form/RecipientFields'

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
            <Form useForm={form} onSubmit={updateSelfInvoice.mutate}>
                <Box>
                    <Tabs defaultStep={'recipient'}>
                        <Tabs.Head id="issuer">Expéditeur</Tabs.Head>
                        <Tabs.Head id="recipient">Destinataire</Tabs.Head>
                        <Tabs.Content id={'issuer'}>
                            <IssuerFields />
                        </Tabs.Content>
                        <Tabs.Content id={'recipient'}>
                            <RecipientFields />
                        </Tabs.Content>
                    </Tabs>
                    <Button className="w-full mt-12" isLoading={updateSelfInvoice.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
