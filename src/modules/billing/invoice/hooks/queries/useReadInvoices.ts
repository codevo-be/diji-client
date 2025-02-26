'use client'

import { useQuery } from '@tanstack/react-query'

import { readInvoices } from '@billing/invoice/services'

export const useReadInvoices = () => {
    return useQuery({
        queryKey: ['invoices'],
        queryFn: readInvoices
    })
}
