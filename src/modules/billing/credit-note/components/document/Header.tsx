import { useParams } from 'next/navigation'

import { DateHelper } from '@digico/utils'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

export const Header = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    return (
        <div className="mb-24">
            <h2 className="text-xl font-bold">
                <span className="text-primary">Note de crédit </span>
                <span className="text-grey-600">{data?.identifier ? data?.identifier : '...'}</span>
            </h2>

            <table className="text-xs mt-8">
                <tbody>
                    <tr>
                        <td className="pr-4">Date</td>
                        <td>{data?.date ? DateHelper.format(data?.date) : '...'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
