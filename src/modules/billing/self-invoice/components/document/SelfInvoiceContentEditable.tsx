import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { Header } from './Header'
import { ItemManager } from './ItemManager'
import { SelfInvoiceFooter } from './SelfInvoiceFooter'
import { SelfInvoiceItemListEditable } from './SelfInvoiceItemListEditable'

export const SelfInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

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
