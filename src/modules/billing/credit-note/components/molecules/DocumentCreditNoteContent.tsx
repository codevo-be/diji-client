import { useParams } from 'next/navigation'

import { useReadCreditNote, useReadCreditNoteItems } from '@billing/credit-note/hooks/queries'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentCreditNoteHeader } from './DocumentCreditNoteHeader'

export const DocumentCreditNoteContent = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    const queryCreditNoteItems = useReadCreditNoteItems(Number(id))

    return (
        <>
            <DocumentCreditNoteHeader />
            <DocumentItems items={queryCreditNoteItems.data?.data ?? []} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
