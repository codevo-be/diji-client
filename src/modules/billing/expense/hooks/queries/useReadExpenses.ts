'use client'

import { useQuery } from '@tanstack/react-query'

import { readExpenses } from '../../services'

export const useReadExpenses = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['expenses', { ...params }],
        queryFn: () => readExpenses(params),
        placeholderData: (previousData) => previousData
    })
}
