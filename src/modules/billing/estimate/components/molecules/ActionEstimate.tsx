import { useParams } from 'next/navigation'

import { ESTIMATE_STATUS_ACCEPTED, ESTIMATE_STATUS_DRAFT, ESTIMATE_STATUS_EXPIRED } from '@billing/estimate/data/estimate-statuses'
import { Grid } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'
import { ValidateBox } from './ValidateBox'

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

    if (data.status === ESTIMATE_STATUS_ACCEPTED || data.status === ESTIMATE_STATUS_EXPIRED) {
        return (
            <Grid.Col>
                <ValidateBox />
            </Grid.Col>
        )
    }

    return (
        <Grid.Col>
            <PendingBox />
        </Grid.Col>
    )
}
