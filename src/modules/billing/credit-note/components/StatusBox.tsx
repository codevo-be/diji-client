import { useParams } from 'next/navigation'

import { Grid, Tag } from '@digico/ui'

import { useReadCreditNote } from '../hooks/queries'

import { CREDIT_NOTE_STATUSES } from '../data/credit-note-statuses'

export const StatusBox = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    return (
        <Grid.Col className="flex ">
            <Tag className={`text-${CREDIT_NOTE_STATUSES[data?.status ?? 'draft'].color}`}>{CREDIT_NOTE_STATUSES[data?.status ?? 'draft'].label}</Tag>
        </Grid.Col>
    )
}
