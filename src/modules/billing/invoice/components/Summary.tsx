import { Grid } from '@digico/ui'

import { ActionInvoice } from '@billing/invoice/components/ActionInvoice'
import { UpdateFormInvoice } from '@billing/invoice/components/form/UpdateFormInvoice'
import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

import { StatusBox } from './StatusBox'

export const SummaryInvoice = () => {
    return (
        <Grid>
            <StatusBox />
            <ActionInvoice />
            <TransactionsBox />
            <UpdateFormInvoice />
        </Grid>
    )
}
