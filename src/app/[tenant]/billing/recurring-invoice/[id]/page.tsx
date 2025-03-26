'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { RECURRING_INVOICE_STATUS_DRAFT } from '@billing/recurring-invoice/data/recurring-invoice-statuses'
import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'

import { RecurringInvoiceContent } from '@billing/recurring-invoice/components/document/RecurringInvoiceContent'
import { RecurringInvoiceContentEditable } from '@billing/recurring-invoice/components/document/RecurringInvoiceContentEditable'
import { SummaryRecurringInvoice } from '@billing/recurring-invoice/components/Summary'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures récurrentes" href={getTenantUrl('/billing/recurring-invoice')}>
                    Facture récurrente
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    {data?.status === RECURRING_INVOICE_STATUS_DRAFT ? <RecurringInvoiceContentEditable /> : <RecurringInvoiceContent />}
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryRecurringInvoice />
            </Grid.Col>
        </Grid>
    )
}
