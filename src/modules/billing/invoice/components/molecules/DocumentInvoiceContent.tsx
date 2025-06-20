import { useParams } from 'next/navigation'

import { useReadInvoice, useReadInvoiceItems } from '@billing/invoice/hooks/queries'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentInvoiceHeader } from './DocumentInvoiceHeader'

export const DocumentInvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    const queryInvoiceItems = useReadInvoiceItems(Number(id))

    return (
        <>
            <DocumentInvoiceHeader />
            <DocumentItems items={queryInvoiceItems.data?.data ?? []} />
            <DocumentSummary data={data} />
            <DocumentFooter data={data} />
        </>
    )
}
