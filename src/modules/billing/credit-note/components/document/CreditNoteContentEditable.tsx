import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { CreditNoteItemListEditable } from './CreditNoteItemListEditable'
import { Header } from './Header'
import { ItemManager } from './ItemManager'

export const CreditNoteContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    return (
        <>
            <Header />
            <CreditNoteItemListEditable />
            <ItemManager />
            <Summary data={data} />
        </>
    )
}
