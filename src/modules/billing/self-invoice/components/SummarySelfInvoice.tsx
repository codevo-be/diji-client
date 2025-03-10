import { Grid } from '@digico/ui'

import { ActionSelfInvoice } from './ActionSelfInvoice'
import { UpdateFormSelfInvoice } from './form/UpdateFormSelfInvoice'
import { StatusBox } from './StatusBox'
import { TransactionsBox } from './TransactionBox'

export const SummarySelfInvoice = () => {
    return (
        <Grid>
            <StatusBox />
            <ActionSelfInvoice />
            <TransactionsBox />
            <UpdateFormSelfInvoice />
        </Grid>
    )
}
