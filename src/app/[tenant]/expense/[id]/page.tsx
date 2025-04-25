'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Grid } from '@digico/ui'

import { useReadExpense } from '@expense/hooks/queries'

import { InvoiceContent } from '@billing/invoice/components/document/InvoiceContent'
import { InvoiceContentEditable } from '@billing/invoice/components/document/InvoiceContentEditable'
import { SummaryInvoice } from '@billing/invoice/components/Summary'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))
    // Todo : afficher une dépense au format facture
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux dépenses">Facture {data?.document_identifier}</PageHeader>
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
