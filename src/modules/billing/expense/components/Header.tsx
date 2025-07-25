import { useParams } from 'next/navigation'

import { DateHelper } from '@digico/utils'

import { useReadExpense } from '@billing/expense/hooks/queries'

export const Header = () => {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    const label = data?.document_type === 'CREDIT_NOTE' ? 'Note de crédit' : 'Facture'

    return (
        <div className="mb-24">
            <h2 className="text-xl font-bold">
                <span className="text-primary">{label} </span>
                <span className="text-grey-600">{data?.document_identifier ?? '...'}</span>
            </h2>

            <table className="text-xs mt-8">
                <tbody>
                    <tr>
                        <td className="pr-4">Date</td>
                        <td>{data?.created_at ? DateHelper.format(data.created_at) : '...'}</td>
                    </tr>

                    {data?.due_date && (
                        <tr>
                            <td className="pr-4 pt-2">Échéance</td>
                            <td className="pt-2">{DateHelper.format(data.due_date)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
