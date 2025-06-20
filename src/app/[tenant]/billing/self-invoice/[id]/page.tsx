'use client'

import { useParams } from 'next/navigation'

import { Grid, PageHeader } from '@digico/ui'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { DocumentSelfInvoice } from '@billing/self-invoice/components/organisms/DocumentSelfInvoice'
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
                <DocumentSelfInvoice />
            </Grid.Col>
            <Grid.Col column={5}>
                <SummarySelfInvoice />
            </Grid.Col>
        </Grid>
    )
}
