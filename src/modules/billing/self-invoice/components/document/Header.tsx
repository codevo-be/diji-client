import { useParams } from 'next/navigation'

import { DateHelper } from '@digico/utils'

import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

export const Header = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    return (
        <div className="mb-24">
            <h2 className="text-xl font-bold">
                <span className="text-primary">Autofacture </span>
                <span className="text-grey-600">{data?.identifier ? data?.identifier : '...'}</span>
            </h2>

            <table className="text-xs mt-8">
                <tbody>
                    <tr>
                        <td className="pr-4">Date</td>
                        <td>{data?.date ? DateHelper.format(data?.date) : '...'}</td>
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
