'use client'

import { useQuery } from '@tanstack/react-query'

import { readTransactions } from '@billing/transaction/services/read-transactions'

export const useReadTransactions = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['transactions', { ...params }],
        queryFn: () => readTransactions(params),
        placeholderData: (previousData) => previousData
    })
}
