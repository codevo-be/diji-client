import { Grid } from '@digico/ui'

import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

import { ActionSelfInvoice } from './ActionSelfInvoice'
import { UpdateFormSelfInvoice } from './form/UpdateFormSelfInvoice'
import { StatusBox } from './StatusBox'

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
