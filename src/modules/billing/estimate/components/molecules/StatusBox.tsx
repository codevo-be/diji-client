import { useParams } from 'next/navigation'

import { ESTIMATE_STATUSES } from '@billing/estimate/data/estimate-statuses'
import { Grid, Tag } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

export const StatusBox = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    return (
        <Grid.Col className="flex ">
            <Tag className={`text-${ESTIMATE_STATUSES[data?.status ?? 'draft'].color}`}>{ESTIMATE_STATUSES[data?.status ?? 'draft'].label}</Tag>
        </Grid.Col>
    )
}
