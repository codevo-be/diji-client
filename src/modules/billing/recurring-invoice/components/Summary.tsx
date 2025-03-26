import { Grid } from '@digico/ui'

import { ActionRecurringInvoice } from './ActionRecurringInvoice'
import { RecurringBox } from './BoxRecurring'
import { UpdateFormRecurringInvoice } from './form/UpdateFormRecurringInvoice'

export const SummaryRecurringInvoice = () => {
    return (
        <Grid>
            <ActionRecurringInvoice />
            <UpdateFormRecurringInvoice />
            <RecurringBox />
        </Grid>
    )
}
