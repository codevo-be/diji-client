'use client'

import { Grid, PageHeader } from '@digico/ui'

import { DocumentRecuringInvoice } from '@billing/recurring-invoice/components/organisms/DocumentRecurringInvoice'
import { SummaryRecurringInvoice } from '@billing/recurring-invoice/components/Summary'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const routeTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures récurrentes" href={routeTenant.get('/billing/recurring-invoice')}>
                    Facture récurrente
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <DocumentRecuringInvoice />
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryRecurringInvoice />
            </Grid.Col>
        </Grid>
    )
}
