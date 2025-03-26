'use client'

import { useQuery } from '@tanstack/react-query'

import { readRecurringInvoices } from '@billing/recurring-invoice/services'

export const useReadRecurringInvoices = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['recurring-invoices', { ...params }],
        queryFn: () => readRecurringInvoices(params)
    })
}
