'use client'

import { useQuery } from '@tanstack/react-query'

import { readExpense } from '@expense/services/read-expense'

export const useReadExpense = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['expenses', { id, ...params }],
        queryFn: () => readExpense(id, params)
    })
}
