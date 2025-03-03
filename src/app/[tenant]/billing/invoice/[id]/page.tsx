'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { ActionInvoice } from '@billing/invoice/components/ActionInvoice'
import { InvoiceContentEditable } from '@billing/invoice/components/document/InvoiceContentEditable'
import { UpdateFormInvoice } from '@billing/invoice/components/form/UpdateFormInvoice'
import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

export default function Page() {
    const { id } = useParams()
    const queryInvoice = useReadInvoice(Number(id))
    const invoice = queryInvoice.data?.data ?? null

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures" href={getTenantUrl('/billing/invoice')}>
                    Facture {invoice?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={invoice ?? undefined}>
                    <InvoiceContentEditable />
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <Grid>
                    <Grid.Col>
                        <ActionInvoice />
                    </Grid.Col>
                    <TransactionsBox />
                    <UpdateFormInvoice />
                </Grid>
            </Grid.Col>
        </Grid>
    )
}
