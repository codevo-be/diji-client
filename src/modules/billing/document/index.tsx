import { Box } from '@digico/ui'

import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { InvoiceType } from '@billing/invoice/types/invoice'
import { RecurringInvoiceType } from '@billing/recurring-invoice/types/recurring-invoice'

import { Header } from './Header'

type Props = {
    children: React.ReactNode
    data: InvoiceType | CreditNoteType | RecurringInvoiceType | undefined
    editable?: boolean
}

export const BillingDocument = ({ children, data }: Props) => {
    if (!data) {
        return
    }

    return (
        <Box size={'xl'} className="aspect-[210/297]">
            <Header data={data} />
            <div className="mt-16 mb-40">{children}</div>
        </Box>
    )
}
