'use client'

import { useQuery } from '@tanstack/react-query'

import { readTransaction } from '@billing/transaction/services/read-transaction'

export const useReadTransaction = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['transactions', { id, ...params }],
        queryFn: () => readTransaction(id, params)
    })
}
