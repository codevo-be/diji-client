import { Box } from '@digico/ui'

import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { EstimateType } from '@billing/estimate/types/estimate'
import { InvoiceType } from '@billing/invoice/types/invoice'
import { RecurringInvoiceType } from '@billing/recurring-invoice/types/recurring-invoice'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

import { DocumentHeader } from '../molecules/DocumentHeader'

type Props = {
    children: React.ReactNode
    data: InvoiceType | CreditNoteType | RecurringInvoiceType | EstimateType | SelfInvoiceType | undefined
    editable?: boolean
}

export const BillingDocument = ({ children, data }: Props) => {
    if (!data) {
        return
    }

    return (
        <Box size={'xl'} className="aspect-[210/297]">
            <DocumentHeader data={data} />
            <div className="mt-16 mb-40">{children}</div>
        </Box>
    )
}
