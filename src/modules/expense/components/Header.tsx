import { useParams } from 'next/navigation'

import { DateHelper } from '@digico/utils'

import { useReadExpense } from '@expense/hooks/queries'

export const Header = () => {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    return (
        <div className="mb-24">
            <h2 className="text-xl font-bold">
                <span className="text-primary">Facture </span>
                <span className="text-grey-600">{data?.document_identifier ? data?.document_identifier : '...'}</span>
            </h2>

            <table className="text-xs mt-8">
                <tbody>
                    <tr>
                        <td className="pr-4">Date</td>
                        <td>{data?.created_at ? DateHelper.format(data?.created_at) : '...'}</td>
                    </tr>

                    {data?.due_date && (
                        <tr>
                            <td className="pr-4 pt-2">Echéance</td>
                            <td className="pt-2">{data?.due_date ? DateHelper.format(data?.due_date) : '...'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
