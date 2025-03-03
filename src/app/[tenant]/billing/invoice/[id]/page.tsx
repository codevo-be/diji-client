'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { ActionInvoice } from '@billing/invoice/components/ActionInvoice'
import { InvoiceContentEditable } from '@billing/invoice/components/document/InvoiceContentEditable'
import { SelectUpdateStatus } from '@billing/invoice/components/form/SelectUpdateStatus'
import { UpdateFormInvoice } from '@billing/invoice/components/form/UpdateFormInvoice'
import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

export default function Page() {
    const { id } = useParams()
    const queryInvoice = useReadInvoice(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures" href={getTenantUrl('/billing/invoice')}>
                    Facture {queryInvoice.data?.data.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={queryInvoice.data?.data}>
                    <InvoiceContentEditable />
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <Grid>
                    <Grid.Col>
                        <SelectUpdateStatus />
                    </Grid.Col>
                    <Grid.Col>
                        <ActionInvoice />
                    </Grid.Col>
                    <Grid.Col>
                        <TransactionsBox />
                    </Grid.Col>
                    {queryInvoice.data?.data.status === 'draft' && (
                        <Grid.Col>
                            <UpdateFormInvoice />
                        </Grid.Col>
                    )}
                </Grid>
            </Grid.Col>
        </Grid>
    )
}
