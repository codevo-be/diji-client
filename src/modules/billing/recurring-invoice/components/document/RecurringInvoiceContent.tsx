import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'

import { Header } from './Header'
import { RecurringInvoiceItemList } from './RecurringInvoiceItemList'

export const RecurringInvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    return (
        <>
            <Header />
            <RecurringInvoiceItemList />
            <Summary data={data} />
        </>
    )
}
