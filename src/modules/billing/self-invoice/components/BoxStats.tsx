import { Box, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { months } from 'data/date'

import { useReadSelfInvoices } from '../hooks/queries'

import { SELF_INVOICE_STATUSES } from '../data/self-invoice-statuses'

export const BoxStats = () => {
    const params = useQueryParams()

    const querySelfInvoices = useReadSelfInvoices({
        month: params.month,
        status: params.status ?? ''
    })

    return (
        <Box size="sm" isLoading={querySelfInvoices.isLoading}>
            <div className="flex gap-4 mb-6">
                {params.month && (
                    <Tag className="text-primary">
                        {
                            months.filter((month) => {
                                return month.value === Number(params.month)
                            })[0].label
                        }
                    </Tag>
                )}

                {params.status && (
                    <Tag className={`text-${SELF_INVOICE_STATUSES[params.status as keyof typeof SELF_INVOICE_STATUSES].color}`}>
                        {SELF_INVOICE_STATUSES[params.status as keyof typeof SELF_INVOICE_STATUSES].label}
                    </Tag>
                )}
            </div>

            <p className="text-grey-600 text-sm">{querySelfInvoices.data?.data.length} factures</p>
            <h2 className="font-bold text-xl">
                {formatCurrency(
                    querySelfInvoices.data?.data.reduce((current, item) => {
                        return current + (item.total ?? 0)
                    }, 0) ?? 0
                )}
            </h2>
        </Box>
    )
}
