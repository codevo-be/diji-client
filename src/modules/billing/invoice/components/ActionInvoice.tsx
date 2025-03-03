import { useParams } from 'next/navigation'

import { useReadInvoice } from '../hooks/queries'

import { INVOICE_STATUS_DRAFT, INVOICE_STATUS_PENDING } from '../data/invoice-statuses'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionInvoice = () => {
    const { id } = useParams()
    const { data: invoice } = useReadInvoice(Number(id))

    if (invoice?.data.status === INVOICE_STATUS_DRAFT) {
        return <DraftBox />
    }

    if (invoice?.data.status === INVOICE_STATUS_PENDING) {
        return <PendingBox />
    }

    return null
}
