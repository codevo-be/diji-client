import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { Header } from './Header'
import { SelfInvoiceFooter } from './SelfInvoiceFooter'
import { SelfInvoiceItemList } from './SelfInvoiceItemList'

export const SelfInvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    return (
        <>
            <Header />
            <SelfInvoiceItemList />
            <Summary data={data} />
            <SelfInvoiceFooter data={data} />
        </>
    )
}
