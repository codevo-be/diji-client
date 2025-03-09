import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadSelfInvoice } from '../hooks/queries'

import { SELF_INVOICE_STATUS_DRAFT } from '../data/self-invoice-statuses'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionSelfInvoice = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    if (!data) {
        return null
    }

    if (data.status === SELF_INVOICE_STATUS_DRAFT) {
        return (
            <Grid.Col>
                <DraftBox />
            </Grid.Col>
        )
    }

    return (
        <Grid.Col>
            <PendingBox />
        </Grid.Col>
    )
}
