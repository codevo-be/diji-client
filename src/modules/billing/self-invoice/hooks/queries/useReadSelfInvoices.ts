'use client'

import { useQuery } from '@tanstack/react-query'

import { readSelfInvoices } from '@billing/self-invoice/services'

export const useReadSelfInvoices = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['self-invoices', { ...params }],
        queryFn: () => readSelfInvoices(params),
        placeholderData: (previousData) => previousData
    })
}
