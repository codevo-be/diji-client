import { useParams } from 'next/navigation'

import { ESTIMATE_STATUS_DRAFT } from '@billing/estimate/data/estimate-statuses'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { BillingDocument } from '@billing/components/organisms/BillingDocument'

import { DocumentInvoiceContent } from '../molecules/DocumentInvoiceContent'
import { DocumentInvoiceContentEditable } from '../molecules/DocumentInvoiceContentEditable'

export const DocumentInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    if (data?.status === ESTIMATE_STATUS_DRAFT) {
        return (
            <BillingDocument data={data}>
                <DocumentInvoiceContentEditable />
            </BillingDocument>
        )
    }

    return (
        <BillingDocument data={data}>
            <DocumentInvoiceContent />
        </BillingDocument>
    )
}
