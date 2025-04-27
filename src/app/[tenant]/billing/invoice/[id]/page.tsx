'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { DocumentInvoice } from '@billing/invoice/components/organisms/DocumentInvoice'
import { SummaryInvoice } from '@billing/invoice/components/Summary'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures">Facture {data?.identifier}</PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <DocumentInvoice />
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryInvoice />
            </Grid.Col>
        </Grid>
    )
}
