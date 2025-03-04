import { Grid } from '@digico/ui'

import { ActionCreditNote } from './ActionCreditNote'
import { StatusBox } from './StatusBox'
import { TransactionsBox } from './TransactionBox'
import { UpdateFormCreditNote } from './UpdateFormCreditNote'

export const SummaryCreditNote = () => {
    return (
        <Grid>
            <StatusBox />
            <ActionCreditNote />
            <TransactionsBox />
            <UpdateFormCreditNote />
        </Grid>
    )
}
