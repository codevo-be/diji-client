'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { DocumentEstimate } from '@billing/estimate/components/organisms/DocumentEstimate'
import { SummaryEstimate } from '@billing/estimate/components/organisms/SummaryEstimate'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux devis">Devis {data?.identifier}</PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <DocumentEstimate />
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryEstimate />
            </Grid.Col>
        </Grid>
    )
}
