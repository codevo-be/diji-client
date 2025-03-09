'use client'

import { useQuery } from '@tanstack/react-query'

import { readSelfInvoicesItems } from '@billing/self-invoice/services/item/read-self-invoice-items'

export const useReadSelfInvoiceItems = (self_invoice_id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['self-invoice-items', { self_invoice_id, ...params }],
        queryFn: () => readSelfInvoicesItems(self_invoice_id, params)
    })
}
