import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { Header } from './Header'
import { InvoiceFooter } from './InvoiceFooter'
import { InvoiceItemListEditable } from './InvoiceItemListEditable'
import { ItemManager } from './ItemManager'

export const InvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <>
            <Header />
            <InvoiceItemListEditable />
            <ItemManager />
            <Summary data={data?.data} />
            <InvoiceFooter data={data?.data} />
        </>
    )
}
