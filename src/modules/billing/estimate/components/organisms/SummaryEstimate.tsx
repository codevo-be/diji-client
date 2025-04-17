import { Grid } from '@digico/ui'

import { StatusSelect } from '../atoms/StatusSelect'
import { ActionEstimate } from '../molecules/ActionEstimate'
import { StatusBox } from '../molecules/StatusBox'

import { UpdateFormEstimate } from './form/UpdateFormEstimate'

export const SummaryEstimate = () => {
    return (
        <Grid>
            <StatusBox />
            <ActionEstimate />
            <StatusSelect />
            <UpdateFormEstimate />
        </Grid>
    )
}
