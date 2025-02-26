'use client'

import { useQuery } from '@tanstack/react-query'

import { readInvoice } from '@billing/invoice/services/read-invoice'

export const useReadInvoice = (id: number) => {
    return useQuery({
        queryKey: ['invoices', { id }],
        queryFn: () => readInvoice(id)
    })
}
