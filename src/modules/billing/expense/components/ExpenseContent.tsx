import { useParams } from 'next/navigation'

import { useReadExpense } from '@billing/expense/hooks/queries/useReadExpense'

import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { ExpenseItemList } from '@billing/expense/components/ExpenseItemList'
import { Header } from '@billing/expense/components/Header'

import { ExpenseFooter } from './ExpenseFooter'

export const ExpenseContent = () => {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    return (
        <>
            <Header />
            <ExpenseItemList data={data} />
            <DocumentSummary data={data} />
            {data?.document_type === 'INVOICE' && <ExpenseFooter data={data} />}
        </>
    )
}
