import { Box, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'

import { useReadRecurringInvoices } from '../hooks/queries'

import { RECURRING_INVOICE_STATUSES } from '../data/recurring-invoice-statuses'

export const BoxStats = () => {
    const params = useQueryParams()

    const querySelfInvoices = useReadRecurringInvoices({
        month: params.month,
        status: params.status ?? ''
    })

    return (
        <Box size="sm" isLoading={querySelfInvoices.isLoading}>
            <div className="flex gap-4 mb-6">
                {params.status && (
                    <Tag className={`text-${RECURRING_INVOICE_STATUSES[params.status as keyof typeof RECURRING_INVOICE_STATUSES].color}`}>
                        {RECURRING_INVOICE_STATUSES[params.status as keyof typeof RECURRING_INVOICE_STATUSES].label}
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
