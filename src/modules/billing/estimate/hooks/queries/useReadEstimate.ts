'use client'

import { useQuery } from '@tanstack/react-query'

import { readEstimate } from '@billing/estimate/services'

export const useReadEstimate = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['estimates', { id, ...params }],
        queryFn: () => readEstimate(id, params)
    })
}
