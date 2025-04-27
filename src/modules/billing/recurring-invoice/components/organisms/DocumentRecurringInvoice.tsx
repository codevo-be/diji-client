import { useParams } from 'next/navigation'

import { RECURRING_INVOICE_STATUS_DRAFT } from '@billing/recurring-invoice/data/recurring-invoice-statuses'

import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'

import { BillingDocument } from '@billing/components/organisms/BillingDocument'

import { DocumentRecurringInvoiceContent } from '../molecules/DocumentRecurringInvoiceContent'
import { DocumentRecurringInvoiceContentEditable } from '../molecules/DocumentRecurringInvoiceContentEditable'

export const DocumentRecuringInvoice = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    if (data?.status === RECURRING_INVOICE_STATUS_DRAFT) {
        return (
            <BillingDocument data={data}>
                <DocumentRecurringInvoiceContentEditable />
            </BillingDocument>
        )
    }

    return (
        <BillingDocument data={data}>
            <DocumentRecurringInvoiceContent />
        </BillingDocument>
    )
}
