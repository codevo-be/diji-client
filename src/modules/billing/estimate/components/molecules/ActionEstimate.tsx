import { useParams } from 'next/navigation'

import { ESTIMATE_STATUS_DRAFT } from '@billing/estimate/data/estimate-statuses'
import { Grid } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionEstimate = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    if (!data) {
        return null
    }

    if (data.status === ESTIMATE_STATUS_DRAFT) {
        return (
            <Grid.Col>
                <DraftBox />
            </Grid.Col>
        )
    }

    return (
        <Grid.Col>
            <PendingBox />
        </Grid.Col>
    )
}
