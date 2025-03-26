import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'

import { Header } from './Header'
import { ItemManager } from './ItemManager'
import { RecurringInvoiceItemListEditable } from './RecurringInvoiceItemListEditable'

export const RecurringInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    return (
        <>
            <Header />
            <RecurringInvoiceItemListEditable />
            <ItemManager />
            <Summary data={data} />
        </>
    )
}
