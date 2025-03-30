'use client'

import { useQuery } from '@tanstack/react-query'

import { readRecurringInvoicesItems } from '@billing/recurring-invoice/services'

export const useReadRecurringInvoiceItems = (recurring_invoice_id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['recurring-invoice-items', { recurring_invoice_id, ...params }],
        queryFn: () => readRecurringInvoicesItems(recurring_invoice_id, params)
    })
}
