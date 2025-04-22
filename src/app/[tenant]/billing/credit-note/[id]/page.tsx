'use client'

import { useParams } from 'next/navigation'

import { Grid, PageHeader } from '@digico/ui'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { DocumentCreditNote } from '@billing/credit-note/components/organisms/DocumentCreditNote'
import { SummaryCreditNote } from '@billing/credit-note/components/Summary'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))
    const routeTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux notes de crédit" href={routeTenant.get('/billing/credit-note')}>
                    Note de crédit {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <DocumentCreditNote />
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryCreditNote />
            </Grid.Col>
        </Grid>
    )
}
