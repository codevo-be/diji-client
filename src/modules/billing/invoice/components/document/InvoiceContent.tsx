import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { Header } from './Header'
import { InvoiceFooter } from './InvoiceFooter'
import { InvoiceItemListEditable } from './InvoiceItemListEditable'

export const InvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <>
            <Header />
            <InvoiceItemListEditable />
            <Summary data={data} />
            <InvoiceFooter data={data} />
        </>
    )
}
