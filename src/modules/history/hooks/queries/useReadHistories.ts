'use client'

import { useQuery } from '@tanstack/react-query'

import { readHistories } from 'modules/history/services/read-histories'

export const useReadHistories = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['histories', { ...params }],
        queryFn: () => readHistories(params),
        placeholderData: (previousData) => previousData
    })
}
