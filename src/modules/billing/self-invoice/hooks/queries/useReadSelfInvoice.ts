'use client'

import { useQuery } from '@tanstack/react-query'

import { readSelfInvoice } from '@billing/self-invoice/services'

export const useReadSelfInvoice = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['self-invoices', { id, ...params }],
        queryFn: () => readSelfInvoice(id, params)
    })
}
