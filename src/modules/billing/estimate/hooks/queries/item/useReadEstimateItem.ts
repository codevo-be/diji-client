'use client'

import { useQuery } from '@tanstack/react-query'

import { readEstimateItem } from '@billing/estimate/services/item/read-estimate-item'

export const useReadEstimateItem = (estimate_id: number, id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['estimate-items', { estimate_id, id, ...params }],
        queryFn: () => readEstimateItem(estimate_id, id, params)
    })
}
