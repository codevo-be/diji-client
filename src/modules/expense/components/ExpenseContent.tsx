import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { Header } from './Header'
import { InvoiceFooter } from './InvoiceFooter'
import { InvoiceItemList } from './InvoiceItemList'

export const ExpenseContent = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <>
            <Header />
            <InvoiceItemList />
            <Summary data={data} />
            <InvoiceFooter data={data} />
        </>
    )
}

// todo : je suis en train de faire la vue expense en recréant les différents composants de la vue invoice