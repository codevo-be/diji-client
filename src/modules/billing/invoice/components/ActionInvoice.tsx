import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadInvoice } from '../hooks/queries'

import { INVOICE_STATUS_DRAFT, INVOICE_STATUS_PENDING } from '../data/invoice-statuses'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    if (data?.status === INVOICE_STATUS_DRAFT) {
        return (
            <Grid.Col>
                <DraftBox />
            </Grid.Col>
        )
    }

    if (data?.status === INVOICE_STATUS_PENDING) {
        return (
            <Grid.Col>
                <PendingBox />
            </Grid.Col>
        )
    }

    return null
}
