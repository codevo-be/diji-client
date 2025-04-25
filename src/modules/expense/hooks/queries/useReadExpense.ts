'use client'

import { useQuery } from '@tanstack/react-query'

import { readExpense } from '@expense/services/read-expense'

export const useReadExpense = (id: number) => {
    return useQuery({
        queryKey: ['expenses', { id }],
        queryFn: () => readExpense(id)
    })
}
