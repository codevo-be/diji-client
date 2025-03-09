'use client'

import { useQuery } from '@tanstack/react-query'

import { readSelfInvoiceItem } from '@billing/self-invoice/services/item/read-self-invoice-item'

export const useReadSelfInvoiceItem = (self_invoice_id: number, id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['self-invoice-items', { self_invoice_id, id, ...params }],
        queryFn: () => readSelfInvoiceItem(self_invoice_id, id, params)
    })
}
