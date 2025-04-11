'use client'

import { useQuery } from '@tanstack/react-query'

import { readInvoices } from '@billing/invoice/services'

export const useReadInvoices = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['invoices', { ...params }],
        queryFn: () => readInvoices(params),
        placeholderData: (previousData) => previousData
    })
}
