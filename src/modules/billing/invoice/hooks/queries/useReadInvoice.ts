'use client'

import { useQuery } from '@tanstack/react-query'

import { readInvoice } from '@billing/invoice/services/read-invoice'

export const useReadInvoice = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['invoices', { id, ...params }],
        queryFn: () => readInvoice(id, params)
    })
}
