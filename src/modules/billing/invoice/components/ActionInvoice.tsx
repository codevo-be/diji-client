import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadInvoice } from '../hooks/queries'

import { INVOICE_STATUS_DRAFT } from '../data/invoice-statuses'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    if (!data) {
        return null
    }

    if (data.status === INVOICE_STATUS_DRAFT) {
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
