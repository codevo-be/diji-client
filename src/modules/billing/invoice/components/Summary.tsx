import { Grid } from '@digico/ui'

import { ActionInvoice } from '@billing/invoice/components/ActionInvoice'
import { UpdateFormInvoice } from '@billing/invoice/components/form/UpdateFormInvoice'
import { TransactionsBox } from '@billing/invoice/components/TransactionBox'

import { HistoryBox } from './molecules/HistoryBox'
import { StatusBox } from './StatusBox'
import { StatusSelect } from './StatusSelect'

export const SummaryInvoice = () => {
    return (
        <Grid>
            <StatusBox />
            <ActionInvoice />
            <HistoryBox />
            <StatusSelect />
            <UpdateFormInvoice />
            <TransactionsBox />
        </Grid>
    )
}
