'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { ESTIMATE_STATUS_DRAFT } from '@billing/estimate/data/estimate-statuses'
import { Grid } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { EstimateContent } from '@billing/estimate/components/organisms/document/EstimateContent'
import { EstimateContentEditable } from '@billing/estimate/components/organisms/document/EstimateContentEditable'
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
                <BillingDocument data={data}>{data?.status === ESTIMATE_STATUS_DRAFT ? <EstimateContentEditable /> : <EstimateContent />}</BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryEstimate />
            </Grid.Col>
        </Grid>
    )
}
