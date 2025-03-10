import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { Header } from './Header'
import { ItemManager } from './ItemManager'
import { SelfInvoiceFooter } from './SelfInvoiceFooter'
import { SelfInvoiceItemListEditable } from './SelfInvoiceItemListEditable'

export const SelfInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    return (
        <>
            <Header />
            <SelfInvoiceItemListEditable />
            <ItemManager />
            <Summary data={data} />
            <SelfInvoiceFooter data={data} />
        </>
    )
}
