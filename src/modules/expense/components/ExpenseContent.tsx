import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadExpense } from '@expense/hooks/queries'

import { ExpenseItemList } from '@expense/components/ExpenseItemList'

import { ExpenseFooter } from './ExpenseFooter'

export const ExpenseContent = () => {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    return (
        <>
            <ExpenseItemList data={data}/>
            <Summary data={data} />
            <ExpenseFooter data={data} />
        </>
    )
}