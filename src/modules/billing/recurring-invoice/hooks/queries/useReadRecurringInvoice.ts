'use client'

import { useQuery } from '@tanstack/react-query'

import { readRecurringInvoice } from '@billing/recurring-invoice/services'

export const useReadRecurringInvoice = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['recurring-invoices', { id, ...params }],
        queryFn: () => readRecurringInvoice(id, params)
    })
}
