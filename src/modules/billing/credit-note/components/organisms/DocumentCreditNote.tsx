import { useParams } from 'next/navigation'

import { CREDIT_NOTE_STATUS_DRAFT } from '@billing/credit-note/data/credit-note-statuses'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { BillingDocument } from '@billing/components/organisms/BillingDocument'

import { DocumentCreditNoteContent } from '../molecules/DocumentCreditNoteContent'
import { DocumentCreditNoteContentEditable } from '../molecules/DocumentCreditNoteContentEditable'

export const DocumentCreditNote = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    if (data?.status === CREDIT_NOTE_STATUS_DRAFT) {
        return (
            <BillingDocument data={data}>
                <DocumentCreditNoteContentEditable />
            </BillingDocument>
        )
    }

    return (
        <BillingDocument data={data}>
            <DocumentCreditNoteContent />
        </BillingDocument>
    )
}
