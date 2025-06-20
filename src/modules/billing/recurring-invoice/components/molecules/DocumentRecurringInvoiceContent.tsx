import { useParams } from 'next/navigation'

import { useReadRecurringInvoice, useReadRecurringInvoiceItems } from '@billing/recurring-invoice/hooks/queries'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentRecurringInvoiceHeader } from './DocumentRecurringInvoiceHeader'

export const DocumentRecurringInvoiceContent = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    const queryRecurringInvoiceItems = useReadRecurringInvoiceItems(Number(id))

    return (
        <>
            <DocumentRecurringInvoiceHeader />
            <DocumentItems items={queryRecurringInvoiceItems.data?.data ?? []} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
