'use client'

import { useQuery } from '@tanstack/react-query'

import { readEstimates } from '@billing/estimate/services'

export const useReadEstimates = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['estimates', { ...params }],
        queryFn: () => readEstimates(params),
        placeholderData: (previousData) => previousData
    })
}
