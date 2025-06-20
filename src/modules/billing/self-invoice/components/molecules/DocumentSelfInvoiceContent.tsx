import { useParams } from 'next/navigation'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'
import { useReadSelfInvoiceItems } from '@billing/self-invoice/hooks/queries/item'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentSelfInvoiceHeader } from './DocumentSelfInvoiceHeader'

export const DocumentSelfInvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    const querySelfInvoiceItem = useReadSelfInvoiceItems(Number(id))

    return (
        <>
            <DocumentSelfInvoiceHeader />
            <DocumentItems items={querySelfInvoiceItem.data?.data ?? []} />
            <DocumentSummary data={data} />
            <DocumentFooter data={data} type="selfinvoice" />
        </>
    )
}
