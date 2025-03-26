'use client'

import { useQuery } from '@tanstack/react-query'

import { readRecurringInvoiceItem } from '@billing/recurring-invoice/services'

export const useReadRecurringInvoiceItem = (recurring_invoice_id: number, id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['recurring-invoice-items', { recurring_invoice_id, id, ...params }],
        queryFn: () => readRecurringInvoiceItem(recurring_invoice_id, id, params)
    })
}
