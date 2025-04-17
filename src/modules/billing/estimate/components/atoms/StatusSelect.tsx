import { useParams } from 'next/navigation'

import { ESTIMATE_STATUSES } from '@billing/estimate/data/estimate-statuses'
import { Box, Grid, SimpleSelect } from '@digico/ui'

import { useUpdateEstimate } from '@billing/estimate/hooks/mutations'
import { useReadEstimate } from '@billing/estimate/hooks/queries'

export const StatusSelect = () => {
    const { id } = useParams()

    const { data } = useReadEstimate(Number(id))
    const updateEstimate = useUpdateEstimate()

    const onChangeStatus = ({ value }: any) => {
        updateEstimate.mutate({
            id: Number(id),
            status: value
        })
    }

    if (!data) {
        return
    }

    return (
        <Grid.Col>
            <Box>
                <SimpleSelect
                    label="Statut"
                    defaultValue={ESTIMATE_STATUSES[data.status]}
                    onChange={onChangeStatus}
                    options={Object.values(ESTIMATE_STATUSES)}
                />
            </Box>
        </Grid.Col>
    )
}
