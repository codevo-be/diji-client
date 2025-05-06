import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { CreditNoteItemList } from './CreditNoteItemList'
import { Header } from './Header'

export const CreditNoteContent = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    return (
        <>
            <Header />
            <CreditNoteItemList />
            {/*@ts-ignore*/}
            <Summary data={data} />
        </>
    )
}
