import { Box, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { months } from 'data/date'

import { useReadInvoices } from '../hooks/queries'

import { INVOICE_STATUSES } from '../data/invoice-statuses'

export const BoxStats = () => {
    const params = useQueryParams()

    const queryInvoices = useReadInvoices({
        month: params.month,
        status: params.status ?? ''
    })

    return (
        <Box size="sm" isLoading={queryInvoices.isLoading}>
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
                    <Tag className={`text-${INVOICE_STATUSES[params.status as keyof typeof INVOICE_STATUSES].color}`}>
                        {INVOICE_STATUSES[params.status as keyof typeof INVOICE_STATUSES].label}
                    </Tag>
                )}
            </div>

            <p className="text-grey-600 text-sm">{queryInvoices.data?.data.length} factures</p>
            <h2 className="font-bold text-xl">
                {formatCurrency(
                    queryInvoices.data?.data.reduce((current, item) => {
                        return current + (item.total ?? 0)
                    }, 0) ?? 0
                )}
            </h2>
        </Box>
    )
}
