import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { Header } from './Header'
import { InvoiceFooter } from './InvoiceFooter'
import { InvoiceItemList } from './InvoiceItemList'

export const InvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <>
            <Header />
            <InvoiceItemList />
            {/*@ts-ignore*/}
            <Summary data={data} />
            <InvoiceFooter data={data} />
        </>
    )
}
