import { useParams } from 'next/navigation'

import { SELF_INVOICE_STATUS_DRAFT } from '@billing/self-invoice/data/self-invoice-statuses'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { BillingDocument } from '@billing/components/organisms/BillingDocument'

import { DocumentSelfInvoiceContent } from '../molecules/DocumentSelfInvoiceContent'
import { DocumentSelfInvoiceContentEditable } from '../molecules/DocumentSelfInvoiceContentEditable'

export const DocumentSelfInvoice = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    if (data?.status === SELF_INVOICE_STATUS_DRAFT) {
        return (
            <BillingDocument data={data}>
                <DocumentSelfInvoiceContentEditable />
            </BillingDocument>
        )
    }

    return (
        <BillingDocument data={data}>
            <DocumentSelfInvoiceContent />
        </BillingDocument>
    )
}
