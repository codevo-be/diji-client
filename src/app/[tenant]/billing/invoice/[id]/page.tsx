'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Grid, PageHeader } from '@digico/ui'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { InvoiceContent } from '@billing/invoice/components/document/InvoiceContent'
import { InvoiceContentEditable } from '@billing/invoice/components/document/InvoiceContentEditable'
import { SummaryInvoice } from '@billing/invoice/components/Summary'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))
    const routeTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures" href={routeTenant.get('/billing/invoice')}>
                    Facture {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>{data?.status === INVOICE_STATUS_DRAFT ? <InvoiceContentEditable /> : <InvoiceContent />}</BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryInvoice />
            </Grid.Col>
        </Grid>
    )
}
