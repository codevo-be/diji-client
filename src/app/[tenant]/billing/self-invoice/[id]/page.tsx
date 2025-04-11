'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { SELF_INVOICE_STATUS_DRAFT } from '@billing/self-invoice/data/self-invoice-statuses'
import { Grid, PageHeader } from '@digico/ui'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { SelfInvoiceContent } from '@billing/self-invoice/components/document/SelfInvoiceContent'
import { SelfInvoiceContentEditable } from '@billing/self-invoice/components/document/SelfInvoiceContentEditable'
import { SummarySelfInvoice } from '@billing/self-invoice/components/SummarySelfInvoice'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))
    const routeTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux auto-facturations" href={routeTenant.get('/billing/self-invoice')}>
                    Autofacturation {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    {data?.status === SELF_INVOICE_STATUS_DRAFT ? <SelfInvoiceContentEditable /> : <SelfInvoiceContent />}
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <SummarySelfInvoice />
            </Grid.Col>
        </Grid>
    )
}
