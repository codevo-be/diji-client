'use client'

import { formatCurrency } from '@digico/utils'
import { ExpenseType } from '@expense/type/expense'

type Props = {
    data: ExpenseType | undefined
}

export const Summary = ({ data }: Props) => {
    return (
        <div className="mt-12 flex justify-end">
            <table className="text-xs font-medium">
                <tbody>
                    <tr>
                        <td className="pr-8">Total HT</td>
                        <td className="text-right">{data?.subtotal ? formatCurrency(data.subtotal) : '...'}</td>
                    </tr>
                    {Object.keys(data?.taxes ?? []).map((tax) => {
                        return (
                            <tr key={tax}>
                                <td>TVA {tax}%</td>
                                <td className="text-right">{formatCurrency(data?.taxes ? (data?.taxes[tax] ?? 0) : 0)}</td>
                            </tr>
                        )
                    })}
                    <tr className="text-sm font-bold">
                        <td className="pt-6">Total</td>
                        <td className="pt-6">{data?.total ? formatCurrency(data?.total) : '...'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
