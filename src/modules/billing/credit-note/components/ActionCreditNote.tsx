import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadCreditNote } from '../hooks/queries'

import { CREDIT_NOTE_STATUS_DRAFT } from '../data/credit-note-statuses'

import { DraftBox } from './DraftBox'
import { PendingBox } from './PendingBox'

export const ActionCreditNote = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    if (!data) {
        return null
    }

    if (data.status === CREDIT_NOTE_STATUS_DRAFT) {
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
