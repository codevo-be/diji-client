'use client'

import { useQuery } from '@tanstack/react-query'

import { readInvoiceItem } from '@billing/invoice/services/item/read-invoice-item'

export const useReadInvoiceItem = (invoice_id: number, id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['invoice-items', { invoice_id, id, ...params }],
        queryFn: () => readInvoiceItem(invoice_id, id, params)
    })
}
