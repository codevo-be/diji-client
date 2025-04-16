'use client'

import { useQuery } from '@tanstack/react-query'

import { readEstimateItems } from '@billing/estimate/services/item/read-estimate-items'

export const useReadEstimateItems = (estimate_id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['estimate-items', { estimate_id, ...params }],
        queryFn: () => readEstimateItems(estimate_id, params)
    })
}
