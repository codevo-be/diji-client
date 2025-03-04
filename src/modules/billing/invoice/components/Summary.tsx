import { Grid } from '@digico/ui'

import { ActionInvoice } from '@billing/invoice/components/ActionInvoice'
import { UpdateFormInvoice } from '@billing/invoice/components/form/UpdateFormInvoice'
import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

export const SummaryInvoice = () => {
    return (
        <Grid>
            <ActionInvoice />
            <TransactionsBox />
            <UpdateFormInvoice />
        </Grid>
    )
}
